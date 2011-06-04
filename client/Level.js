
define(['./lib/jo/jo', './lib/jo/TileMap'],function(jo, TileMap){
	
	var lvl = TileMap.extend({
		onNode: true
	});
	return lvl;
});