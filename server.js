const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const users = require('./local-park-files/users/users-route');
const parks = require('./local-park-files/park/park-router')
const ratings = require('./local-park-files/ratings/rating-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', ratings)
server.use('/api', parks)
server.use('/api', users);

server.get('/', (req, res)=>{
    res.json({message: "Welcome to the default zone, please specify a path"})
})

module.exports = server;