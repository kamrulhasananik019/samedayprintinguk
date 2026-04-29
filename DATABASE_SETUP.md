# Same Day Printing UK - Database Setup Guide

## What Has Been Done

### 1. ✅ Database Seeding Script Created
- **File**: `scripts/seed-db.mjs`
- **Database**: `samedayprintinguk`
- **Collections seeded with dummy data:**
  - **Categories** (3): Business Cards, Flyers & Leaflets, Banners & Signage
  - **Products** (3): Premium Glossy Business Cards, A4 Flyers, Vinyl Banners
  - **Reviews** (3): Sample customer reviews with ratings
  - **FAQs** (4): Common questions about services, delivery, and policies

### 2. ✅ Password Security Improved
- **Removed**: Plain-text password fallback from authentication system
  - File modified: `src/lib/admin-auth.ts`
  - Now only scrypt-hashed passwords are accepted
  - No more insecure plain-text password comparisons

- **Removed**: Plain-text admin password from environment
  - File: `.env.local`
  - Removed `ADMIN_PASSWORD=1122@#Aa`
  - Admin login now uses database-stored hashed credentials

### 3. ✅ Added NPM Script
Added to `package.json`:
```json
"seed": "node scripts/seed-db.mjs"
```

## How to Use

### Step 1: Seed the Database
Run the seeding script to populate the database with dummy data:

```bash
pnpm seed
```

Or using npm:
```bash
npm run seed
```

### What This Does:
- Clears existing data in categories, products, reviews, and FAQs collections
- Creates 3 product categories
- Creates 3 sample products with images and descriptions
- Inserts 3 sample customer reviews
- Adds 4 FAQs about the service

### Step 2: Access the Admin Panel
1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to: `http://localhost:3000/admin/login`

3. You'll need to create an admin account by:
   - Using the admin creation API endpoint, or
   - Manually inserting a hashed password into the `admins` collection

### Creating Admin User via Database

Connect to MongoDB and run:

```javascript
db.admins.insertOne({
  email: "admin@samedayprinting.uk",
  password_hash: "scrypt$your_salt$your_hash_here",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## Database Structure

### Categories Collection
```javascript
{
  slug: "business-cards",
  name: "Business Cards",
  description: { /* RichText doc */ },
  image: { url, alt },
  seo: { title, description, keywords, image },
  isActive: true,
  sortOrder: 1
}
```

### Products Collection
```javascript
{
  slug: "premium-business-cards",
  name: "Premium Glossy Business Cards",
  images: [{ url, alt }],
  categoryIds: [ObjectId],
  seo: { /* SEO meta */ },
  isFeatured: true,
  isActive: true
}
```

### Reviews Collection
```javascript
{
  name: "Customer Name",
  email: "customer@example.com",
  rating: 5,
  text: "Review text...",
  status: "approved", // pending, approved, declined, deleted
  source: "public", // public, admin
  reviewDate: "2024-04-29"
}
```

### FAQs Collection
```javascript
{
  question: "Question text?",
  answer: "Answer text...",
  sortOrder: 1,
  isActive: true
}
```

## Environment Variables

Key variables in `.env.local`:

| Variable | Purpose | Type |
|----------|---------|------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `MONGODB_DB_NAME` | Database name | Required |
| `ADMIN_SESSION_SECRET` | Session encryption key | Required |
| `EMAIL_USER` | SMTP user for contact emails | Required |
| `EMAIL_PASS` | SMTP password | Required |
| `CLOUDFLARE_*` | R2 bucket credentials | Required |

## Security Notes

✅ **Improvements Made:**
- Plain-text passwords no longer supported
- Admin authentication uses database-stored scrypt hashes
- Session tokens are cryptographically signed
- Timing-safe password comparison prevents timing attacks

⚠️ **Next Steps:**
- Implement password hashing when creating admin users
- Use environment variables for credentials only
- Never commit `.env.local` to version control
- Use `.env.example` for template with placeholder values

## Troubleshooting

### Script fails to connect to MongoDB
- Check `MONGODB_URI` in `.env.local`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify database username/password

### Admin login not working
- Ensure admin user exists in `admins` collection
- Password hash must be valid scrypt format
- Check browser console for error messages

### Products not showing on homepage
- Verify products have `isActive: true`
- Check category associations
- Clear Next.js cache: `rm -rf .next`

## Need Help?

Check the existing code in:
- `src/lib/mongo-catalog.ts` - Database operations
- `src/services/` - Business logic
- `src/app/api/` - API endpoints
