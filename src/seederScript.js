import dotenv from 'dotenv';
// import productData from './data/books.js';
import { Book } from './models/book.model.js';

dotenv.config();



const importData = async () => {
  try {
    await Book.deleteMany({});

    await Book.insertMany(productData);

    console.log('Data Import Success');

    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

export default importData
