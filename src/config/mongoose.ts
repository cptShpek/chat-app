import { connect, set } from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI;

// connection to DB
export const connectToDB = async () => {
  try {
    set("strictQuery", false);
    const db = await connect(MONGO_DB_URI);
    console.log("MongoDB connected to", db.connection.name);
    // Emit an event when the connection is successful
  } catch (error) {
    console.log({ error });
  }
};
