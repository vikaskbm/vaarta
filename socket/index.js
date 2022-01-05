const io = require('socket.io')(8101, {
    cors: {
        origin: "*",
    },
});

let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && 
        users.push({userId, socketId})
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

const removeUser = (userId, socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}
io.on('connection', (socket) => {

    // User connected
    console.log('a user connected!');

    socket.on("addUser", (userId) => {
        console.log("Add user")
        console.log(userId)
        addUser(userId, socket.id)
        socket.emit("getUsers", users)
    })

    // Send messages
    socket.on("sendMessage", ({senderId, receiverId, text}) => {

        console.log(receiverId)
        console.log(senderId)
        const user = getUser(receiverId)
        console.log("user", user)
        // io.to(user.socketId).emit("getMessage", {
        //     senderId,
        //     text
        // })
    })



    // User disconnected
    socket.on("disconnect", () => {
        console.log("A user disconnected")
        removeUser(socket.id);
        socket.emit("getUsers", users)
    })

});
