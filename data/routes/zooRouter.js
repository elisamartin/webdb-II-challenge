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

// POST /api/zoos
router.post('/', (req, res) => {
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
router.get('/', async (req, res) => {
	try {
		const allAnimals = await db('zoos');
		res.json(allAnimals);
	} catch (error) {
		res.status(500).json({ message: 'Unable to retrieve list of zoos' });
	}
});

// GET /api/zoos/:id
router.get('/:id', async (req, res) => {
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
router.delete('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
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

module.exports = router;
