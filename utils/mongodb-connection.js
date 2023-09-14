import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  //   if (cachedClient) {
  //     return cachedClient;
  //   }

  //   try {
  //     const CLIENT = new MongoClient(URI, {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     });

  //     await CLIENT.connect();

  //     console.log("Connected to MongoDB");

  //     cachedClient = CLIENT;
  //     return CLIENT;
  //   } catch (error) {
  //     console.error("Error connecting to database: " + error);
  //     throw error;
  //   }

  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(URI);

    try {
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
