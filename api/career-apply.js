import path from "node:path";
import Busboy from "busboy";
import { GridFSBucket, MongoClient } from "mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ABOUT_MAX_LENGTH = 250;
const MAX_RESUME_SIZE = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_RESUME_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const VALID_POSITIONS = new Set([
  "Mobile Application Development Intern / Associate - Flutter, Dart & Cross-Platform App Developer",
  "Java Full Stack Intern",
  "Java Full Stack Developer",
  "Full Stack Intern / Associate - MERN, PERN & Modern JavaScript Stacks",
  "Prompt Engineering Intern",
  "Prompt Engineer - AI, NLP & Generative AI",
]);
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1000;
const DATABASE_NAME = process.env.MONGODB_DB_NAME || "bitbyte_technologies";
const COLLECTION_NAME = "career_applications";
const RESUME_BUCKET_NAME = "career_resumes";

let mongoClientPromise;

function setCorsHeaders(res) {
  const requestOrigin = res.req?.headers?.origin || "";
  const configuredOrigins = String(process.env.CAREER_APPLY_ALLOWED_ORIGIN || "*")
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
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, statusCode, payload) {
  setCorsHeaders(res);
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

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
    message: "Unable to submit application. Please try again.",
  };
}

function cleanText(value) {
  return String(value || "").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isValidPhone(phone) {
  return /^\+?[0-9\s()-]{7,18}$/.test(phone);
}

function isAllowedResume(file) {
  const extension = path.extname(file.fileName || "").toLowerCase();
  return (
    ALLOWED_RESUME_TYPES.has(file.mimeType) &&
    ALLOWED_RESUME_EXTENSIONS.has(extension)
  );
}

function safeFileName(fileName) {
  const extension = path.extname(fileName || "").toLowerCase();
  const baseName = path
    .basename(fileName || "resume", extension)
    .replace(/[^a-z0-9-_]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${baseName || "resume"}${extension}`;
}

function uploadResumeToGridFS(db, resume, application, submittedAt) {
  return new Promise((resolve, reject) => {
    const bucket = new GridFSBucket(db, { bucketName: RESUME_BUCKET_NAME });
    const uploadStream = bucket.openUploadStream(safeFileName(resume.fileName), {
      contentType: resume.mimeType,
      metadata: {
        originalFileName: resume.fileName,
        applicantEmail: application.email,
        position: application.position,
        submittedAt,
      },
    });

    uploadStream.on("error", reject);
    uploadStream.on("finish", () => resolve(uploadStream.id));
    uploadStream.end(resume.buffer);
  });
}

function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const fields = {};
    let resume = null;
    let fileTooLarge = false;

    const busboy = Busboy({
      headers: req.headers,
      limits: {
        files: 1,
        fileSize: MAX_RESUME_SIZE,
        fields: 8,
      },
    });

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (name, file, info) => {
      const chunks = [];

      file.on("data", (chunk) => {
        chunks.push(chunk);
      });

      file.on("limit", () => {
        fileTooLarge = true;
      });

      file.on("end", () => {
        if (name !== "resume") return;

        resume = {
          fileName: info.filename || "resume",
          mimeType: info.mimeType || "",
          buffer: Buffer.concat(chunks),
        };
      });
    });

    busboy.on("error", reject);
    busboy.on("finish", () => {
      resolve({ fields, resume, fileTooLarge });
    });

    req.pipe(busboy);
  });
}

function validateApplication({ fields, resume, fileTooLarge }) {
  const application = {
    name: cleanText(fields.name),
    email: cleanText(fields.email).toLowerCase(),
    phone: cleanText(fields.phone),
    position: cleanText(fields.position),
    about: cleanText(fields.about),
  };

  if (!application.name) return { message: "Please enter your full name." };
  if (!isValidEmail(application.email)) return { message: "Please enter a valid email address." };
  if (!isValidPhone(application.phone)) return { message: "Please enter a valid phone number." };
  if (!VALID_POSITIONS.has(application.position)) return { message: "Please select a valid position." };
  if (!application.about) return { message: "Please tell us briefly about yourself." };
  if (application.about.length > ABOUT_MAX_LENGTH) {
    return { message: `About Yourself must be under ${ABOUT_MAX_LENGTH} characters.` };
  }
  if (!resume || !resume.buffer?.length) return { message: "Please upload your resume." };
  if (fileTooLarge || resume.buffer.length > MAX_RESUME_SIZE) {
    return { message: "Resume must be less than 5 MB." };
  }
  if (!isAllowedResume(resume)) return { message: "Resume must be PDF, DOC, or DOCX." };

  return { application };
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    sendJson(res, 405, { success: false, message: "Method not allowed." });
    return;
  }

  try {
    const parsedForm = await parseMultipartForm(req);
    const validation = validateApplication(parsedForm);

    if (!validation.application) {
      sendJson(res, 400, { success: false, message: validation.message });
      return;
    }

    const { application } = validation;
    const { resume } = parsedForm;
    const client = await getMongoClient();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const recentDuplicate = await collection.findOne({
      email: application.email,
      position: application.position,
      submittedAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
    });

    if (recentDuplicate) {
      sendJson(res, 409, {
        success: false,
        message: "An application for this position was already submitted recently.",
      });
      return;
    }

    const submittedAt = new Date();
    const resumeFileId = await uploadResumeToGridFS(
      db,
      resume,
      application,
      submittedAt,
    );

    await collection.insertOne({
      ...application,
      resumeFileId,
      resumeFileName: resume.fileName,
      resumeMimeType: resume.mimeType,
      resumeStorage: "mongodb-gridfs",
      submittedAt,
    });

    sendJson(res, 201, {
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    const mongoError = getMongoErrorResponse(error);
    console.error("Career application API error:", {
      code: error.code,
      name: error.name,
      message: error.message,
    });
    sendJson(res, mongoError.statusCode, {
      success: false,
      message: mongoError.message,
    });
  }
}
