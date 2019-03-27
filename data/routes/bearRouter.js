const express = require('express');
const router = express.Router();
const knex = require('knex');

const db = knex({
	client: 'sqlite',
	useNullAsDefault: true,
	connection: {
		filename: './data/lambda.sqlite3'
	}
});

// POST /api/bears
router.post('/', (req, res) => {
	db('bears')
		.insert(req.body)
		.then((arrayOfIds) => {
			db('bears').where({ id: arrayOfIds[0] });
		})
		.then((id) => {
			res.status(201).json(id);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Something went wrong' });
		});
});

// // GET /api/bears
router.get('/', async (req, res) => {
	try {
		const allAnimals = await db('bears');
		res.json(allAnimals);
	} catch (err) {
		res.status(500).json({ message: 'Unable to retrieve list of bears' });
	}
});

// GET /api/bears/:id
router.get('/:id', async (req, res) => {
	try {
		const zoo = await db('bears').where({ id: req.params.id });
		if (zoo.length) {
			res.status(200).json(zoo[0]);
		} else {
			res.status(404).json({ message: 'ID not found' });
		}
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong' });
	}
});

// DELETE /api/bears/:id
router.delete('/:id', (req, res) => {
	db('bears')
		.where({ id: req.params.id })
		.del()
		.then(() => {
			res.status(200).json('Deleted!');
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// PUT /api/bears/:id
router.put('/:id', (req, res) => {
	db('bears')
		.where({ id: req.params.id })
		.update(req.body)
		.then(() => {
			res.status(200).json('Updated!');
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
