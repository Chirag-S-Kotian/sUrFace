import mongoose from "mongoose";

export async function connect() {
  const db = process.env.MONGO_URI;
  try {
    if (!db) {
      throw new Error("Mongodb is not connected..!");
    }
    await mongoose.connect(db);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongodb connected successfully");
    });

    connection.on("error", (err) => {
      console.error("Mongodb is not running, check it properly..!", +err);
      process.exit(1);
    });
  } catch (error) {
    console.error("connection error");
    process.exit(1);
  }
}
