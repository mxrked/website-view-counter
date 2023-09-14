import { connectToDatabase } from "@/utils/mongodb-connection";

export default async (req, res) => {
  const { headers } = req;
  const IP_ADDRESS =
    headers["x-forwarded-for"] || req.connection.remoteAddress || "";

  try {
    const DB = await connectToDatabase();
    const IP_COLLECTION = DB.collection("ips");

    // Check if the current IP address is already in the database.
    const EXISTING_IP = await IP_COLLECTION.findOne({ IP_ADDRESS });

    if (!EXISTING_IP) {
      await IP_COLLECTION.insertOne({ IP_ADDRESS });
    }

    // Getting the total count of unique IPs
    const TOTAL_UNIQUE_IPS = await IP_COLLECTION.countDocuments();

    res.status(200).json({ TOTAL_UNIQUE_IPS });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: "An error occured" });
  }
};
