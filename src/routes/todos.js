/** @format */

const express = require('express');
const TodosItems = require('../models/todoItems');

const routes = express.Router();

routes.post('/todo', async (req, res) => {
	try {
		const todo_item = await TodosItems(req.body);
		const todoslist = await TodosItems.find({});

		const isPresent = todoslist.filter(
			(list) => list.todo === todo_item.todo,
		);
		if (!isPresent.length) {
			todo_item.save();
			return res.status(201).send(todo_item);
		}
		return res
			.status(400)
			.send({ errorMessage: 'Already have this data in our list' });
	} catch (err) {
		res.status(500).send(err);
	}
});

routes.get('/todo', async (req, res) => {
	try {
		const todo_item = await TodosItems.find({});
		if (!todo_item) res.status(404).send();
		res.send(todo_item);
	} catch (err) {
		res.status(500).send(err);
	}
});

routes.delete('/todo/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const todo_item = await TodosItems.findByIdAndDelete(id);
		if (!todo_item) res.status(404).send();
		res.status(200).send();
	} catch (e) {
		res.status(500).send(e);
	}
});

routes.patch('/todo/:id', async (req, res) => {
	const fileldsToUpdate = Object.keys(req.body);
	const fieldsInModel = ['todo'];
	const isUpdateAllow = fileldsToUpdate.every((field) =>
		fieldsInModel.includes(field),
	);
	if (!isUpdateAllow) {
		return res.status(400).send({ errorMessage: 'Invalid field' });
	}
	const id = req.params.id;
	try {
		const todoslist = await TodosItems.find({});
		const isPresent = todoslist.filter(
			(list) => list.todo === req.body.todo,
		);
		if (req.body.todo === '') return res.status(400).send();
		if (!isPresent.length) {
			const todo_item = await TodosItems.findByIdAndUpdate(id, req.body, {
				new: true,
				runValidators: true,
			});
			return res.send(todo_item);
		}
		return res
			.status(400)
			.send({ errorMessage: 'Already have this data in our list' });
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = routes;
