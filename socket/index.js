const io = require('socket.io')(8101, {
    cors: {
        origin: "*",
    },
});

let users = []
io.on('connection', (socket) => {
    console.log('a user connected!');
    socket.emit("welcome", "hello this is a welcome message")
});
