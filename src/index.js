require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const { mongodbUrl, port } = require('./config/config')
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));
app.use(express.json());
// Connect with databse
mongoose.connect(
  mongodbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) {
      console.log('err', err);
    }
    app.listen(port, () => console.log(`listening on port ${port}`));
    console.log('Mongodb Connected successfully');
  },
);

app.use(require('./routes'));

module.exports = app;
