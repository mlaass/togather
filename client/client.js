require(['YodaClient', 'Chat', 'lib/jo/jo', 'lib/jo/Game','lib/jo/Camera', './Level', './sidebar'], 
		function(Yoda, Chat, jo, Game, Camera, Level, sb){	
	//one global variable to rule them all very useful with the firebug console
	$jo=jo;
	
	//the game object needs id of the canvas 
	var game = jo.game = new Game({ name: '#canvas', fullscreen: true, fps: 30});
	var yoda;
	game.sb=sb;
	game.setup(function(){
		//preloading of the files we need
		game.load(['img/logo.png',
		           'img/tileset.png']);
		
		game.cam = new jo.Camera(0,0);
		
		game.entities = ['Player', 'Door', 'Key', 'Trigger'];
	});

	game.ready(function(){
		game.state = 'start';
		game.ts = new jo.TileSet([0,1,2,3, [{i:4, t:800},{i:5, t: 600}], 6], 64,64, jo.files.img.tileset);
		
		
		yoda = new Yoda(8000);			
		
		yoda.ready(function(){		
			var chat = yoda.entangleInstance('chat', Chat);
			game.map = yoda.entangleInstance('map', Level);

			game.map.tileSet = game.ts;
			
			$('#chat-text').html(chat.clientRenderHtml());
			
			$('#chat-form').submit(function(e){
				var msg = $('#input').val();
				if(msg !== ''){
					chat.post({time: '$time', client: '$id', text:msg });
				}
				
				$('#chat-input').val('');
				e.preventDefault();
				return 0;
			});
			yoda.sync(function(msg){
				$('#chat-text').html(chat.clientRenderHtml());
				jo.log(msg);
			});
		});	
	});
	
	//main game loop
	game.OnUpdate(function(ticks){

			game.editControls();

	});
	var pal = 0;
	game.editControls= function(){
		//player.pos.copy(game.cam.toWorld(jo.input.mouse));
		if(jo.input.k('D') ){
			jo.log(game.map.data);
		}
		if(jo.input.once('P') ){
			var lvl = game.saveLevel();
			jo.log(lvl.json);
		}

		if(jo.input.k('CTRL')|| jo.input.k('ALT')){

			 if(jo.input.k('UP')){
				 game.map.shift(0,-1,{index: -1});
			 }
			 if(jo.input.k('DOWN')){
				 game.map.shift(0,1,{index: -1});
			 }
			 if(jo.input.k('LEFT')){
				 game.map.shift(-1,0,{index: -1});
			 }
			 if(jo.input.k('RIGHT')){
				 game.map.shift(1,0,{index: -1});
			 }
		}
		if(jo.input.once('TAB')){
			pal = (pal+1)%game.map.tileSet.tiles.length;
		}
		if(jo.tool==='pick'){
			if(jo.input.once('MOUSE1')){
				for(var i in game.objects){
					if(m2d.intersect.pointBox( game.cam.toWorld(jo.input.mouse), game.objects[i])){
						game.sb.select = game.selection= i;
						
						game.sb.fillInspector();
					}
				}
			}else if(jo.input.k('MOUSE1') ){
				if(game.selection){
					game.objects[game.selection].pos.copy(game.cam.toWorld(jo.input.mouse));
				}
			 }else{
				 game.selection=false;
			 }
		}
		
		if(jo.tool==='drag'){
			 if(jo.input.k('MOUSE1') ){
				game.cam.subtract(jo.input.mouseMovement());
			 }
		}
		if(jo.tool==='tile'){
			if(jo.input.k('MOUSE1')){
				var p=game.cam.toMap(jo.input.mouse);
				game.map.put(p.x, p.y, {index: pal});
			}
			if(jo.input.k('MOUSE2')){
				var p=game.cam.toMap(jo.input.mouse);
				game.map.put(p.x, p.y, {index: -1});
			}
		}
	};
	var caption = function(msg){
		jo.screen.text({align: 'center', fill: 'white', stroke: 0}, jo.point(jo.screen.width/2, jo.screen.height/2), msg);
	};
	
	//main drawing loop get called after each update
	game.OnDraw(function() {
		jo.screen.clear(jo.color(0,0,0));
		
		if(game.map){
			//var p = game.cam.toWorld();
			
			p = game.cam.toScreen();
			game.map.draw({x: p.x, y: p.y, width: jo.screen.width, height:jo.screen.height, grid: true}, new jo.Point(0,0), jo.screen);
		}

		jo.files.img.logo.draw({angle: (jo.screen.frames/60)*Math.PI, pivot: 'center'}, jo.point(jo.screen.width-48,jo.screen.height-48), jo.screen);				
	});	
	
});