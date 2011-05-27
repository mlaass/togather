
define(['./lib/jo/src/jo', './lib/jo/src/TileMap'],function(jo, TileMap){
	
	var lvl = TileMap.extend({
		onNode: true
	});
	return lvl;
});