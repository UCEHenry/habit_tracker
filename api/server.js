const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

// const habitRoutes = require('./routes/habits');
// const userRoutes = require('./routes/users')
// server.use('/habits', habitRoutes)
// server.use('/users', userRoutes)
const singleRoute = require('./routes/route')
server.use('/users', singleRoute)

server.get('/', (req, res) => res.send('Welcome to Habit tracker'));

module.exports = server
