const serverPort = process.env.PORT || 4000;
const server = require('socket.io')(serverPort);

var brewberries = {};

var subscribers = {
	'liveTemp': new Set()
};

server.on('connection', (socket) => {
	console.log('new connection')
	socket.on('subscribe', function(data){
		console.log('new subscription')
		if (subscribers[data]) {
			subscribers[data].add(socket);
		}
	});

	socket.on('liveTemp', function(data) {
		console.log(data)
		for(let subSocket of subscribers['liveTemp']) {
			subSocket.emit('liveTemp', data);
		}
	});
});
