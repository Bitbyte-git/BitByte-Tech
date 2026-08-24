import { MongoClient } from "mongodb";

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "bitbyte_technologies";
const COLLECTION_NAME = "career_applications";
const MAX_APPLICATIONS = 100;

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
    message: "Unable to load applications.",
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

function sendJson(req, res, statusCode, payload) {
  setCorsHeaders(req, res);
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "private, no-store");
  res.end(JSON.stringify(payload));
}

function getBearerToken(req) {
  return req.headers.authorization?.replace(/^Bearer\s+/i, "").trim() || "";
}

function isAuthorized(req) {
  const adminSecret = process.env.CAREER_ADMIN_SECRET;

  if (!adminSecret) {
    return false;
  }

  return getBearerToken(req) === adminSecret;
}

function serializeApplication(application) {
  return {
    id: application._id?.toString() || "",
    name: application.name || "",
    email: application.email || "",
    phone: application.phone || "",
    position: application.position || "",
    about: application.about || "",
    resumeFileId: application.resumeFileId?.toString() || "",
    resumeFileName: application.resumeFileName || "resume",
    resumeMimeType: application.resumeMimeType || "",
    submittedAt: application.submittedAt || null,
  };
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
    sendJson(req, res, 405, {
      success: false,
      message: "Method not allowed.",
    });
    return;
  }

  if (!process.env.CAREER_ADMIN_SECRET) {
    sendJson(req, res, 503, {
      success: false,
      message: "Career admin access is not configured.",
    });
    return;
  }

  if (!isAuthorized(req)) {
    sendJson(req, res, 401, {
      success: false,
      message: "Unauthorized.",
    });
    return;
  }

  try {
    const client = await getMongoClient();
    const db = client.db(DATABASE_NAME);
    const applications = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ submittedAt: -1 })
      .limit(MAX_APPLICATIONS)
      .toArray();

    sendJson(req, res, 200, {
      success: true,
      applications: applications.map(serializeApplication),
    });
  } catch (error) {
    const mongoError = getMongoErrorResponse(error);
    console.error("Career admin applications API error:", {
      code: error.code,
      name: error.name,
      message: error.message,
    });
    sendJson(req, res, mongoError.statusCode, {
      success: false,
      message: mongoError.message,
    });
  }
}
