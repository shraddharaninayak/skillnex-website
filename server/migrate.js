import "dotenv/config";
import { connectDB } from "./mongodb.js";
import programs from "./data/programs.js";

async function migrate() {
  try {
    const db = await connectDB();

    const collection = db.collection("programs");

    console.log(`Found ${programs.length} programs.`);

    // Clear existing programs before inserting
    await collection.deleteMany({});

    // Add status and timestamps
    const documents = programs.map((program) => ({
      ...program,
      status: "published",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    if (documents.length > 0) {
      await collection.insertMany(documents);
    }

    console.log(
      `Successfully migrated ${documents.length} programs to MongoDB.`
    );

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();