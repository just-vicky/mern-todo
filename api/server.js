const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const connection = mongoose.connection;
connection.once('open',() => {
  console.log("Connection established successfully")
})

const Todo = require('./models/todo')

app.get('/todos', async(req, res) => {
  const todos = await Todo.find();

  res.json(todos);
})

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async(req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json(result);
});

app.put('/todo/complete/:id', async(req, res) => {
	const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

	res.json(todo);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})