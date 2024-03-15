// getting-started.js
const mongoose = require('mongoose');

async function db() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blog');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = db;