import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'samedayprintinguk';

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

const client = new MongoClient(MONGODB_URI);

async function seedDatabase() {
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    console.log(`Connected to database: ${DB_NAME}`);

    // Clear existing collections
    console.log('Clearing existing collections...');
    await db.collection('categories').deleteMany({});
    await db.collection('products').deleteMany({});
    await db.collection('reviews').deleteMany({});
    await db.collection('faqs').deleteMany({});

    // Seed Categories
    console.log('Seeding categories...');
    const categoryDocs = [
      {
        slug: 'business-cards',
        slugAliases: ['cards', 'business-card'],
        name: 'Business Cards',
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Professional business cards for your company.' }],
            },
          ],
        },
        image: {
          url: 'https://via.placeholder.com/400x300?text=Business+Cards',
          alt: 'Business Cards',
        },
        parentId: null,
        seo: {
          title: 'Business Cards - Same Day Printing',
          description: 'High-quality business cards printed same day',
          keywords: ['business cards', 'same day printing'],
          image: 'https://via.placeholder.com/400x300?text=Business+Cards',
        },
        isActive: true,
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'flyers',
        slugAliases: ['leaflets', 'brochures'],
        name: 'Flyers & Leaflets',
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Eye-catching flyers and leaflets for your marketing campaigns.' }],
            },
          ],
        },
        image: {
          url: 'https://via.placeholder.com/400x300?text=Flyers',
          alt: 'Flyers & Leaflets',
        },
        parentId: null,
        seo: {
          title: 'Flyers & Leaflets - Same Day Printing',
          description: 'Custom printed flyers available for same day delivery',
          keywords: ['flyers', 'leaflets', 'same day'],
          image: 'https://via.placeholder.com/400x300?text=Flyers',
        },
        isActive: true,
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'banners',
        slugAliases: ['signage'],
        name: 'Banners & Signage',
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Large format banners and signage for events and promotions.' }],
            },
          ],
        },
        image: {
          url: 'https://via.placeholder.com/400x300?text=Banners',
          alt: 'Banners & Signage',
        },
        parentId: null,
        seo: {
          title: 'Banners & Signage - Same Day Printing',
          description: 'Professional banners and signs printed and delivered same day',
          keywords: ['banners', 'signage', 'large format'],
          image: 'https://via.placeholder.com/400x300?text=Banners',
        },
        isActive: true,
        sortOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const insertedCategories = await db.collection('categories').insertMany(categoryDocs);
    const categoryIds = Object.values(insertedCategories.insertedIds);
    console.log(`✅ Inserted ${categoryIds.length} categories`);

    // Seed Products
    console.log('Seeding products...');
    const productDocs = [
      {
        slug: 'premium-business-cards',
        slugAliases: ['glossy-cards'],
        name: 'Premium Glossy Business Cards',
        shortDescription: {
          type: 'doc',
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: '350gsm Glossy Business Cards' }] },
          ],
        },
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'High-quality glossy business cards printed on premium 350gsm card stock. Available in various sizes with full-color printing.',
                },
              ],
            },
          ],
        },
        images: [
          { url: 'https://via.placeholder.com/600x400?text=Business+Cards+1', alt: 'Business Cards Sample 1' },
          { url: 'https://via.placeholder.com/600x400?text=Business+Cards+2', alt: 'Business Cards Sample 2' },
        ],
        badges: ['bestseller', 'same-day'],
        categoryIds: [categoryIds[0]],
        seo: {
          title: 'Premium Glossy Business Cards - Same Day Delivery',
          description: 'High-quality 350gsm glossy business cards. Order today for same day delivery in London.',
          keywords: ['business cards', 'glossy', 'premium', 'same day'],
          image: 'https://via.placeholder.com/600x400?text=Business+Cards+1',
        },
        isFeatured: true,
        isActive: true,
        sortOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'a4-flyers',
        slugAliases: ['a4-leaflets'],
        name: 'A4 Flyers (100gsm)',
        shortDescription: {
          type: 'doc',
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Professional A4 Flyers' }] },
          ],
        },
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Eye-catching A4 flyers printed on 100gsm paper. Perfect for promotions, events, and marketing campaigns.',
                },
              ],
            },
          ],
        },
        images: [
          { url: 'https://via.placeholder.com/600x400?text=A4+Flyers+1', alt: 'A4 Flyers Sample 1' },
          { url: 'https://via.placeholder.com/600x400?text=A4+Flyers+2', alt: 'A4 Flyers Sample 2' },
        ],
        badges: ['popular', 'same-day'],
        categoryIds: [categoryIds[1]],
        seo: {
          title: 'A4 Flyers Printing - Same Day Service',
          description: 'Professional A4 flyer printing on 100gsm paper. Same day printing and delivery available.',
          keywords: ['flyers', 'a4', 'printing', 'same day'],
          image: 'https://via.placeholder.com/600x400?text=A4+Flyers+1',
        },
        isFeatured: true,
        isActive: true,
        sortOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        slug: 'vinyl-banners',
        slugAliases: ['outdoor-banners'],
        name: 'Vinyl Banners (Outdoor)',
        shortDescription: {
          type: 'doc',
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Durable Vinyl Outdoor Banners' }] },
          ],
        },
        description: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Professional-grade vinyl banners perfect for outdoor use. Weather-resistant and long-lasting with vibrant full-color printing.',
                },
              ],
            },
          ],
        },
        images: [
          { url: 'https://via.placeholder.com/600x400?text=Vinyl+Banner+1', alt: 'Vinyl Banner Sample 1' },
          { url: 'https://via.placeholder.com/600x400?text=Vinyl+Banner+2', alt: 'Vinyl Banner Sample 2' },
        ],
        badges: ['professional', 'durable'],
        categoryIds: [categoryIds[2]],
        seo: {
          title: 'Vinyl Banners - Professional Outdoor Printing',
          description: 'Weather-resistant vinyl banners for outdoor events and promotions. Custom sizes available.',
          keywords: ['vinyl banners', 'outdoor', 'signage', 'weather-resistant'],
          image: 'https://via.placeholder.com/600x400?text=Vinyl+Banner+1',
        },
        isFeatured: false,
        isActive: true,
        sortOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('products').insertMany(productDocs);
    console.log(`✅ Inserted ${productDocs.length} products`);

    // Seed Reviews
    console.log('Seeding reviews...');
    const reviewDocs = [
      {
        name: 'John Smith',
        email: 'john@example.com',
        rating: 5,
        text: 'Excellent service! Got my business cards printed and delivered same day. Highly recommended!',
        status: 'approved',
        source: 'public',
        reviewDate: new Date().toISOString().split('T')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        rating: 5,
        text: 'The quality of the flyers is outstanding. Great prices and fast delivery!',
        status: 'approved',
        source: 'public',
        reviewDate: new Date().toISOString().split('T')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Michael Brown',
        email: 'michael@example.com',
        rating: 4,
        text: 'Good service overall. A bit pricy but the quality justifies it.',
        status: 'approved',
        source: 'public',
        reviewDate: new Date().toISOString().split('T')[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('reviews').insertMany(reviewDocs);
    console.log(`✅ Inserted ${reviewDocs.length} reviews`);

    // Seed FAQs
    console.log('Seeding FAQs...');
    const faqDocs = [
      {
        question: 'Do you offer same day delivery?',
        answer: 'Yes! We offer same day printing and delivery for orders placed before 2 PM within London.',
        sortOrder: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, bank transfers, and PayPal.',
        sortOrder: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: 'Can I get a sample before ordering in bulk?',
        answer: 'Absolutely! We can provide samples for most products. Contact us for details.',
        sortOrder: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: 'What is your return policy?',
        answer: 'We offer a 100% satisfaction guarantee. If you are not happy with your order, we will reprint it free of charge.',
        sortOrder: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('faqs').insertMany(faqDocs);
    console.log(`✅ Inserted ${faqDocs.length} FAQs`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`Database: ${DB_NAME}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();
