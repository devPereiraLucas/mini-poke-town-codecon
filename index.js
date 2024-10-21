const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const serverPort = 3000
const { Server } = require('socket.io')
const io = new Server(server)
const users = {}

app.use("/public", express.static("public", {}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log(`[${socket.id}] LOG: USER_CONNECTED`)
  users[socket.id] = { id: socket.id, x: 0, y: 0 }

  socket.on('disconnect', () => {
    console.log(`[${socket.id}] LOG: USER_DISCONNECTED`)
    users[socket.id] = undefined
  })
})

server.listen(serverPort, () => {
  console.log(`listening on *: ${serverPort}`)
})

