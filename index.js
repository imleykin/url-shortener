const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('port') || 4000;
const app = express();

app.use('/api/auth', require('./routes/auth.routes'));

const startApp = async () => {
  try {
    await mongoose.connect(config.get('dbUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(PORT, () => console.log(`App started on PORT=${PORT}`));
  } catch(err) {
    console.log('A server error occured', err.message);
    process.exit(1);
  }
}

startApp();
