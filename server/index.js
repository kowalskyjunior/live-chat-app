const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: ['http://localhost:5173'] })

const PORT = 5000

io.on('connection', socket => {
    console.log('usuario conectado', socket.id)

    socket.on('setUsername', username => {
        socket.data.username = username
    })

    socket.on('message', text => {
        io.emit('receiveMessage', {
            text,
            authorId: socket.id,
            author: socket.data.username
        })
    })
})

server.listen(PORT, () => console.log('Server conectado...'))