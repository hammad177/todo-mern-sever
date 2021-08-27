/** @format */

const experss = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
require('./db/mongoose');

const app = experss();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(experss.json());
app.use(todoRoutes);

app.listen(port, () => {
	console.log(`Server is up and running at ${port}`);
});
