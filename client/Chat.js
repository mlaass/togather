define([],function(){
	var Chat = function(){
		this.history = [];
	};
	Chat.prototype.post = function(msg){		
		this.history.push(msg);
		
		if(this.history.length>15){
			this.history.shift();
		}
	};	
	Chat.prototype.clientRenderHtml = function(){
		var r = '';
		for(var i in this.history){
			var time= new Date(this.history[i].time);
			r+= '<p><span class="time">['+time.toLocaleTimeString()+']</span><b class="name">'+this.history[i].client+': </b>'+this.history[i].text+'</p>';
		}
		return r;
	};	
	return Chat;
});