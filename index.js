const express = require('express');
const helmet = require('helmet');

const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());
server.use(helmet());

const zooRouter = require('./data/routes/zooRouter');
const bearRouter = require('./data/routes/bearRouter');

server.use('/api/zoos', zooRouter);
server.use('/api/bears', bearRouter);

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
