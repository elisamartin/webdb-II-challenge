const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const server = express();

const db = knex({
	client: 'sqlite',
	useNullAsDefault: true,
	connection: {
		filename: './data/lambda.sqlite3'
	}
});

server.use(express.json());
server.use(helmet());

// endpoints here
// POST /api/zoos
server.post('/api/zoos', (req, res) => {
	db('zoos')
		.insert(req.body)
		.then((arrayOfIds) => {
			db('zoos').where({ id: arrayOfIds[0] });
		})
		.then((id) => {
			res.status(201).json(id);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Something went wrong' });
		});
});

// GET /api/zoos
server.get('/api/zoos', async (req, res) => {
	try {
		const allAnimals = await db('zoos');
		res.json(allAnimals);
	} catch (error) {
		res.status(500).json({ message: 'Unable to retrieve list of zoos' });
	}
});

// GET /api/zoos/:id
server.get('/api/zoos/:id', async (req, res) => {
	try {
		const zoo = await db('zoos').where({ id: req.params.id });
		if (zoo.length) {
			res.status(200).json(zoo[0]);
		} else {
			res.status(404).json({ message: 'ID not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' });
	}
});

// DELETE /api/zoos/:id
server.delete('/api/zoos/:id', (req, res) => {
	db('zoos')
		.where({ id: req.params.id })
		.del()
		.then(() => {
			res.status(200).json('Deleted!');
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// PUT /api/zoos/:id
server.put('/api/zoos/:id', (req, res) => {
	db('zoos')
		.where({ id: req.params.id })
		.update(req.body)
		.then(() => {
			res.status(200).json('Updated!');
		})
		.catch((err) => {
			res.status(500).json({ message: 'Unable to update zoo' });
		});
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
