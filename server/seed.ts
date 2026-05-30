import db from './database.js';
import destinations from '../src/data/destinations.js';

export async function seedDatabase() {
  try {
    // Seed Destinations
    const existingDestinations = await db.all('SELECT id FROM destinations LIMIT 1');
    if (existingDestinations.length === 0) {
      console.log('Seeding destinations...');
      for (const dest of destinations) {
        await db.run(
          `INSERT INTO destinations (id, name, country, image, price, rating, description, category, featured)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            dest.id,
            dest.name,
            dest.country,
            dest.image,
            dest.price,
            dest.rating,
            dest.description,
            dest.category,
            dest.featured ? 1 : 0
          ]
        );
      }
      console.log('Destinations table seeded successfully.');
    } else {
      console.log('Destinations table already has data. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding SQLite database:', error);
  }
}

export default seedDatabase;