import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://Hari:Aashika81@cluster0.xprol.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = await client.db();
    const meetupsCollection = db.collection("meetups");
    await meetupsCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "Meetup inserted" });
  }
}

export default handler;
