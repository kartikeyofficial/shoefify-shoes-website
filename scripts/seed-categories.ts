import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  sort_order: { type: Number, default: 0 },
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

const categories = [
  { name: 'Men', slug: 'men', sort_order: 0 },
  { name: 'Women', slug: 'women', sort_order: 1 },
  { name: 'Sneakers', slug: 'sneakers', sort_order: 2 },
  { name: 'Formal', slug: 'formal', sort_order: 3 },
  { name: 'Sports', slug: 'sports', sort_order: 4 },
  { name: 'Kid', slug: 'kid', sort_order: 5 },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const cat of categories) {
      const exists = await Category.findOne({ slug: cat.slug });
      if (!exists) {
        await Category.create(cat);
        console.log(`Created category: ${cat.name}`);
      } else {
        console.log(`Category already exists: ${cat.name}`);
      }
    }

    console.log('Finished seeding categories');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seed();
