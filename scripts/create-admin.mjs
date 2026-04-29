import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://samedayprintinguk:Pr1me%40Pr1nt@cluster0.vmve3bx.mongodb.net/?appName=Cluster0';
const DB_NAME = 'samedayprintinguk';
const ADMIN_EMAIL = 'primeprintlondon@gmail.com';
const ADMIN_PASSWORD = '1122@#Aa';

const client = new MongoClient(MONGODB_URI);

async function createAdminUser() {
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    console.log(`Connected to database: ${DB_NAME}`);

    // Check if admin already exists
    const existingAdmin = await db.collection('admins').findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (existingAdmin) {
      console.log(`⚠️  Admin user ${ADMIN_EMAIL} already exists. Updating password...`);
      await db.collection('admins').updateOne(
        { email: ADMIN_EMAIL.toLowerCase() },
        {
          $set: {
            passwordHash: ADMIN_PASSWORD,
            updatedAt: new Date(),
          },
        }
      );
      console.log(`✅ Admin password updated successfully!`);
    } else {
      // Create new admin user
      const result = await db.collection('admins').insertOne({
        email: ADMIN_EMAIL.toLowerCase(),
        passwordHash: ADMIN_PASSWORD,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log(`✅ Admin user created successfully!`);
      console.log(`ID: ${result.insertedId}`);
    }

    console.log(`\nAdmin Credentials:`);
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log(`\nYou can now login at: http://localhost:3000/admin/login`);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

createAdminUser();
