const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

module.exports = function connectDB() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.error('MongoDB connect error:', err);
      process.exit(1);
    });
};
