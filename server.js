var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');
//
var clientSay = 'clientSay';
var ServerSay = 'serverSay';
function emitToId(socket, id, msg) {
    socket.broadcast.to(id).emit(ServerSay, msg);
}
server.listen(8890);
io.on('connection', function (socket) {
    //A unique identifier for the session, that comes from the underlying Client.
    var socketId = socket.id;
    console.log(socketId);
    //A hash of strings identifying the rooms this client is in, indexed by room name.
    var socketRooms = socket.rooms;
    console.log(socketRooms);
    //A reference to the underlying Client object.
    //var socketClient = socket.client;
    //console.log(socketClient);
    console.log("new client connected");
    var redisClient = redis.createClient();
    redisClient.subscribe('message');
    redisClient.on("message", function(channel, message) {
        console.log("mew message in queue "+ message + "channel");
        socket.emit(channel, message);
    });
    //console.log(redisClient);
    socket.on(clientSay, function (message) {
        //console.log(message);
        emitToId(socket, message, '12345678');
        return;
        console.log("mew message in queue "+ message + "channel");
        socket.emit(ServerSay, message);
    })
    socket.on('disconnect', function() {
        redisClient.quit();
    });
});