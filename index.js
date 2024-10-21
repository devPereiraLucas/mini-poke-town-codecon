const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const serverPort = 3000

const { Server } = require('socket.io')
const io = new Server(server)

app.use("/public", express.static("public", {}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(serverPort, () => {
  console.log(`listening on *: ${serverPort}`)
})

