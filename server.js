require(['http', 'url', 'fs', 'sys','mongoose', 
         './lib/yoda/Yoda', 
         './client/Chat', 
         './client/Level',
         './client/lib/jo/jo',
         './client/lib/jo/Object'], 
		function(http, url, fs, sys, mongo, 
				Yoda, Chat, Level, jo, Object){
	

	mongo.connect('mongodb://localhost/test');
	
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
	yoda.sync(function(client, msg){
		
		if(msg.instance === 'map'){
			fs.writeFile('map.json', yoda.getInstance('map').stringify(), function (err) {
				if (err) throw err;
			});
		}
	});
	yoda.message(function(client, msg){
		
	});

	yoda.addInstance('chat', Chat);	
	//yoda.addInstance('map', Level, {arguments: [{tileSet:null, width:12, height:12}], ignore:{draw: 1,update:1, init:1, convertFrame:1, get:1}});
	
	fs.readFile('map.json', function (err, data) {
		if (err) {
			throw err;
		}else{
			sys.puts(data);
			var map = Object.parse(data);
			yoda.addInstance('map', Level, {arguments: [{tileSet:null, width:12, height:12}], instance: map, ignore:{draw: 1,update:1, init:1, convertFrame:1, get:1}});

			fs.writeFile('maptest.json', map.stringify(), function (err) {
				if (err) throw err;
				
			});
		}
	});
		
	
	
	
	
});