import { GridFSBucket, MongoClient, ObjectId } from "mongodb";

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "bitbyte_technologies";
const RESUME_BUCKET_NAME = "career_resumes";

let mongoClientPromise;

function getMongoClient() {
  if (!process.env.MONGODB_URI) {
    const error = new Error("MONGODB_URI is not configured");
    error.code = "MISSING_MONGODB_URI";
    throw error;
  }

  if (!mongoClientPromise) {
    mongoClientPromise = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    }).connect();
  }

  return mongoClientPromise;
}

function getMongoErrorResponse(error) {
  if (error.code === "MISSING_MONGODB_URI") {
    return {
      statusCode: 503,
      message: "MongoDB connection is not configured in the hosting environment.",
    };
  }

  if (
    error.name === "MongoServerSelectionError" ||
    /querySrv|ENOTFOUND|ETIMEOUT|ECONNREFUSED|server selection/i.test(error.message)
  ) {
    return {
      statusCode: 503,
      message:
        "MongoDB is unreachable from the hosting environment. Check Atlas network access and the MongoDB URI.",
    };
  }

  return {
    statusCode: 500,
    message: "Unable to download resume.",
  };
}

function setCorsHeaders(req, res) {
  const requestOrigin = req.headers.origin || "";
  const configuredOrigins = String(
    process.env.CAREER_ADMIN_ALLOWED_ORIGIN ||
      process.env.CAREER_APPLY_ALLOWED_ORIGIN ||
      "*",
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const allowOrigin =
    configuredOrigins.includes("*") ||
    configuredOrigins.includes(requestOrigin) ||
    /^https?:\/\/localhost(:\d+)?$/i.test(requestOrigin)
      ? requestOrigin || "*"
      : configuredOrigins[0] || "*";

  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
}

function isAuthorized(req) {
  const allowedTokens = [
    process.env.CAREER_ADMIN_SECRET,
    process.env.CAREER_RESUME_DOWNLOAD_TOKEN,
  ].filter(Boolean);

  if (!allowedTokens.length) return false;

  const headerToken = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  const queryToken = req.query?.token;
  return allowedTokens.includes(headerToken) || allowedTokens.includes(queryToken);
}

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  const id = String(req.query?.id || "");

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid resume id." });
  }

  try {
    const client = await getMongoClient();
    const db = client.db(DATABASE_NAME);
    const bucket = new GridFSBucket(db, { bucketName: RESUME_BUCKET_NAME });
    const fileId = new ObjectId(id);
    const [file] = await bucket.find({ _id: fileId }).toArray();

    if (!file) {
      return res.status(404).json({ success: false, message: "Resume not found." });
    }

    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("Content-Type", file.contentType || "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${String(file.filename || "resume").replace(/"/g, "")}"`,
    );

    bucket.openDownloadStream(fileId).pipe(res);
  } catch (error) {
    const mongoError = getMongoErrorResponse(error);
    console.error("Career resume download error:", {
      code: error.code,
      name: error.name,
      message: error.message,
    });
    return res.status(mongoError.statusCode).json({
      success: false,
      message: mongoError.message,
    });
  }
}
