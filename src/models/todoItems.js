/** @format */

const mongoose = require('mongoose');

const TodosSchema = mongoose.Schema({
	todo: {
		type: String,
	},
});

const TodosItems = mongoose.model('todoslist', TodosSchema);

module.exports = TodosItems;
