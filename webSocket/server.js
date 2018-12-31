// 引入 wx 模块，调用server构造函数
var WebsocketServer = require('ws').Server

// 实例化，端口号 3002
var wss = new WebsocketServer({
	port:3002
})

// 当客户端有连接进入时触发 connection 事件
wss.on('connection', function(ws){
	console.log('1.服务端连接成功');

	// 后端接收前端的消息
	ws.on("message", function(msg){
		console.log('2.前端传递到后台的数据：' + msg)
		
		// 后端向前端发送消息
		ws.send('3.响应的' + msg)
	})

})



