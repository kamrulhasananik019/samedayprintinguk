import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'samedayprintinguk';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

const client = new MongoClient(MONGODB_URI);

async function getAdminData() {
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    console.log(`Connected to database: ${DB_NAME}\n`);

    // Fetch all admin users
    const admins = await db.collection('admins').find({}).toArray();

    if (admins.length === 0) {
      console.log('No admin users found in database');
      return;
    }

    console.log('Admin Users in Database:\n');
    admins.forEach((admin, index) => {
      console.log(`Admin #${index + 1}:`);
      console.log(JSON.stringify(admin, null, 2));
      console.log('\n---\n');
    });
  } catch (error) {
    console.error('❌ Error fetching admin data:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

getAdminData();
