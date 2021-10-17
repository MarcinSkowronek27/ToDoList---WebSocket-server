const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});
const io = socket(server);

const tasks = [];

io.on('connection', (socket) => {
  socket.emit('updateData', tasks);
  socket.on('addTask', (taskName) => {
    tasks.push(taskName);
    socket.broadcast.emit('addTask', tasks);
  });
  socket.on('removeTask', (removeId) => {
    tasks.splice(tasks.indexOf(removeId, 1));
    socket.broadcast.emit('removeTask', tasks);
  });
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});