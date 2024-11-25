import { NextResponse } from "next/server";
import multer from "multer";
import { MongoClient, GridFSBucket } from "mongodb";
import { Readable } from "stream";

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

export const dynamic = "force-dynamic"; // Set the dynamic behavior

// Middleware to process the multipart/form-data
const processRequest = (req: any) =>
  new Promise((resolve, reject) => {
    const uploadHandler = upload.single("file"); // Ensure "file" matches your field name
    uploadHandler(req as any, {} as any, (error: any) => {
      if (error) {
        console.error("Error in multer:", error);
        return reject(error);
      }
      console.log("Multer processed request:", req.file);
      resolve(req);
    });
  });
// MongoDB connection details
const DB_NAME = "dev"; // Your database name

export async function POST(request: Request) {
  try {
    const req: any = await processRequest(request);
    const file = req.file;

    console.log("file read", file);
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log(file);
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI_DEV as string);
    await client.connect();
    const database = client.db(DB_NAME);
    const bucket = new GridFSBucket(database, { bucketName: "uploads" });

    // Upload the file to GridFS
    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });
    const readableFile = Readable.from(file.buffer);
    readableFile.pipe(uploadStream);

    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });

    client.close();

    return NextResponse.json({
      message: "File uploaded successfully",
      file: {
        filename: uploadStream.filename,
        id: uploadStream.id,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
