const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build a Task Manager', completed: false },
];

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    text: req.body.text,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.text = req.body.text || task.text;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
