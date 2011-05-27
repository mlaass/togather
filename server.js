require(['http', 'url', 'fs', 'sys', './lib/yoda/Yoda', './client/Chat', './client/Level'], 
		function(http, url, fs, sys, Yoda, Chat, Level){
	
	var server = http.createServer(function(req, res) {		
		// your normal server code
		var path = url.parse(req.url).pathname;
		switch (path) {
		case '/server.js':
			path= '/404';
		case '/':
			path = '/client/index.html';
			break;
		case '/YodaClient.js':
			path= '/lib/yoda/YodaClient.js';
			break;
		default:
			path = '/client'+path;
		}		
		fs.readFile('.'+ path, function(err, data) {
			if (err) return send404(res);
			var ct = path.substr(path.length - 3) === '.js' ? 'text/javascript' : 'text/html';
			ct = path.substring(path.length-4) === '.css' ? 'text/css' : ct;
			ct = path.substring(path.length-4) === '.png' ? 'image/png' : ct;
			
			res.writeHead(200, {'Content-Type' : ct });
			res.write(data, 'utf8');
			res.end();
		});
		
	}),	send404 = function(res) {
		res.writeHead(404);
		res.write('<h1>404</h1>');
		res.end();
	};

	server.listen(8000);
	sys.puts('Server running at http://127.0.0.1:8000/');	
	
	var yoda = new Yoda({listen: server});	
	//add instances to Yoda
	yoda.addInstance('chat', Chat);	
	yoda.addInstance('map', Level, {arguments: [null, 256, 256], ignore:{draw: 1,update:1, init:1, convertFrame:1, get:1}});
});