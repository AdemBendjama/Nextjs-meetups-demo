import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://meetupsUser:X9epVlTOe8raXOXn@cluster0.mzrllbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const data = req.body

            await client.connect()

            await client.db('meetups').collection('meetups').insertOne(data)

            await client.close()

            res.status(201).json({ message: 'Meetup added successfully' })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to Add Meetup' })
        }

    }

}