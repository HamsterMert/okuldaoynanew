import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI!;
let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set.');
  }

  if (!client) {
    try {
      client = new MongoClient(uri);
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (e) {
      console.error('MongoDB connection failed:', e);
      throw new Error('Failed to connect to MongoDB');
    }
  }
  return client.db('gamesDB').collection('games');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const collection = await connectToDatabase();

    if (req.method === 'GET') {
      const games = await collection.find().toArray();
      return res.status(200).json(games);
    } else if (req.method === 'POST') {
      const game = req.body;
      if (
        !game.id ||
        !game.title ||
        !game.description ||
        !game.category ||
        !game.subject ||
        !game.thumbnail ||
        !game.gameUrl
      ) {
        return res.status(400).json({ error: 'All required fields must be provided.' });
      }
      if (await collection.findOne({ id: game.id })) {
        return res.status(400).json({ error: 'This ID is already in use.' });
      }
      const result = await collection.insertOne(game);
      return res.status(201).json({ ...game, _id: result.insertedId });
    } else if (req.method === 'PUT') {
      const { _id, ...update } = req.body;
      if (!_id) {
        return res.status(400).json({ error: 'Game _id is required.' });
      }
      const result = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: update }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Game not found.' });
      }
      return res.status(200).json({ message: 'Game updated.' });
    } else if (req.method === 'DELETE') {
      const { _id } = req.query;
      if (!_id) {
        return res.status(400).json({ error: 'Game _id is required.' });
      }
      const result = await collection.deleteOne({ _id: new ObjectId(_id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Game not found.' });
      }
      return res.status(200).json({ message: 'Game deleted.' });
    } else {
      return res.status(405).json({ error: 'Method not allowed.' });
    }
  } catch (e) {
    console.error('API error:', e);
    return res.status(500).json({ error: 'Internal server error.' });
  } finally {
    // Optionally close the MongoDB connection (uncomment for production if needed)
    // if (client) {
    //   await client.close();
    //   client = null;
    // }
  }
}