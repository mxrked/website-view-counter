import { connectToDatabase } from "@/utils/mongodb-connection";

// const IPSTACK_KEY = "6eafccee3db72681fcd3589b807c0f2e";

export default async (req, res) => {
  const { headers } = req;
  let IP_ADDRESS =
    headers["x-forwarded-for"] || req.connection.remoteAddress || "";

  // Skipping the localhost ip address and marking it as null for later removal
  if (IP_ADDRESS === "127.0.0.1" || IP_ADDRESS === "::1") {
    IP_ADDRESS = null;
  }

  try {
    // Creating the connection
    const DB = await connectToDatabase();

    // Creating the collection
    const IP_COLLECTION = DB.collection("ips");

    // Check if the current IP address is already in the database.
    const EXISTING_IP = await IP_COLLECTION.findOne({ IP_ADDRESS });

    console.log("IP_ADDRESS: " + IP_ADDRESS);

    if (!EXISTING_IP) {
      await IP_COLLECTION.insertOne({ IP_ADDRESS });

      //   // Make API request to IPStack to get location information
      //   const LOCATION_INFO = await fetch(
      //     `http://api.ipstack.com/${IP_ADDRESS}?access_key=6eafccee3db72681fcd3589b807c0f2e`
      //   )
      //     .then((response) => response.json())
      //     .catch((error) => {
      //       console.error(
      //         `Error fetching location data for IP ${IP_ADDRESS}: ${error}`
      //       );
      //       return null; // Handles error gracefully
      //     });

      //   if (LOCATION_INFO) {
      //     await IP_COLLECTION.updateOne(
      //       { IP_ADDRESS },
      //       { $set: { location: LOCATION_INFO } }
      //     );
      //   }
    }

    // Removing null ip addresses
    await IP_COLLECTION.deleteMany({ IP_ADDRESS: null });

    // Getting the total count of unique IPs
    const TOTAL_UNIQUE_IPS = await IP_COLLECTION.countDocuments();

    res.status(200).json({ TOTAL_UNIQUE_IPS });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: "An error occured" });
  }
};
