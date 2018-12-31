// 引入 wx 模块，调用server构造函数
var WebsocketServer = require('ws').Server

// 实例化，端口号 3003
var wss = new WebsocketServer({
	port:3003
})


// ******************************************************
// 广播功能
// 每有一个客户端连接到服务器，都会创建一个 ws
// 创建空数组存放所有的 ws
var sockets = []
wss.on('connection', function(ws){
	console.log('服务端连接成功');

	sockets.push(ws)
	ws.on("message", function(msg){
		console.log('前端传递到后台的数据：' + msg)
		// 循环所有的ws，发送消息
		for (var i = 0; i < sockets.length; i++) {
			sockets[i].send('广播的消息：' + msg)
		}
		ws.send('响应的' + msg)
	})


	// 在客户端关闭重连后会出现掉线情况，
	// 是因为客户端关闭了，但对应的ws没有移出
	// ws.on('close',callback) 监听ws的close事件，然后将关闭的ws移出
	ws.on('close', function(){
		for (var i = 0; i < sockets.length; i++) {
			if (sockets[i] == this) {
				sockets.splice(i, 1)
				break;
			}
		}
	})
})

