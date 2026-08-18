import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export async function connectDB() {
  if (db) {
    return db;
  }

  await client.connect();

  db = client.db("Skillnex");

  await db.command({ ping: 1 });

  console.log("MongoDB connected successfully");

  return db;
}

export function getDB() {
  if (!db) {
    throw new Error("MongoDB is not connected");
  }

  return db;
}