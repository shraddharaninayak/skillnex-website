import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const client = new MongoClient(uri);

let db;

export async function connectDB() {
  if (db) return db;

  await client.connect();

  db = client.db("Skillnex");

  console.log("Connected to MongoDB");

  return db;
}

export function getDB() {
  if (!db) {
    throw new Error("MongoDB is not connected");
  }

  return db;
}