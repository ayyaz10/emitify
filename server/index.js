const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // console.log(`User Connected: ${socket.id}`);
  

  socket.on('joinRoom', data => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })

  socket.on("sendMessage", (data) => {
    console.log(data)
    socket.to(data.room).emit("receiveMessage", data)
  })

});

app.get('/', (req, res) => {
  res.send('helo world')
})

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})