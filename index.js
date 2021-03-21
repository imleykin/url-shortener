const express = require('express');
const config = require('config');

const PORT = config.get('port') || 4000;

const app = express();

app.listen(PORT, () => console.log('App has been started'));
