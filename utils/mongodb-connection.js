import { MongoClient } from "mongodb";

// const URI = process.env.MONGO_DB_URI;
const URI =
  "mongodb+srv://admin:website_view_counter_DB_020700@website-view-counter.0vosvbu.mongodb.net/?retryWrites=true&w=majority";

// Used to cache the client and database to ensure that only one connection is established and reused
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    // Creating the connection
    cachedClient = new MongoClient(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      // Connecting
      await cachedClient.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to database: " + error);
      throw error;
    }
  }

  cachedDb = cachedClient.db(); // Get the database object

  return cachedDb;
}
