import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'samedayprintinguk';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

const client = new MongoClient(MONGODB_URI);

async function cleanupAdminDatabase() {
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    console.log(`Connected to database: ${DB_NAME}`);

    // Remove password_hash field from all admins
    const result = await db.collection('admins').updateMany(
      {},
      { $unset: { password_hash: '' } }
    );

    console.log(`✅ Cleanup completed!`);
    console.log(`Modified documents: ${result.modifiedCount}`);
    console.log(`Removed duplicate password_hash field`);
  } catch (error) {
    console.error('❌ Error cleaning up database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

cleanupAdminDatabase();
