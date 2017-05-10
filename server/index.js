// Entry point for server
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./router');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
const app = express();
app.use(morgan('combined')); // logging framework
app.use(bodyParser.json({ type: '*/*' })); // parse incoming requests to body object on req (json format)
router(app); // init routes on our express app

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
