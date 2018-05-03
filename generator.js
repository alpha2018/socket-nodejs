module.exports = {
    //可选，在建立连接之前会执行
    beforeConnect : function(client) {
    },
    //必选，建立连接后要做的事情
    onConnect : function(client, done) {
        //向服务器发送消息
        //client为客户端的连接实例
        var identification = {_method:'bind' ,_id:12345};
        identification = JSON.stringify(identification);
        client.emit('GetMessageList', identification);
        //回调函数
        //done();
    },
    //必选，向服务器发送消息时运行的代码
    sendMessage : function(client, done) {
        client.emit('GetMessageList','{"channelID": "1609"}');
        //done();
    },
    options : {
        // realm: 'chat'
    }
};