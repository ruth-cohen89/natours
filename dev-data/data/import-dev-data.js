const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

// Script, node ./dev-data/data/import-dev-data.js --import/delete
// Note! comment out the 2 pre('save') password middleware
// on userModel before running import

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('You are connected to the DB 🕴️'));

const tours = JSON.parse(
  // eslint-disable-next-line no-template-curly-in-string
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);
const users = JSON.parse(
  // eslint-disable-next-line no-template-curly-in-string
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
);
const reviews = JSON.parse(
  // eslint-disable-next-line no-template-curly-in-string
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfuly loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfuly deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
