define(['./lib/jo/jo', './lib/jquery-1.5.2.min'], function(jo, jq){
	var sb = new (jo.Class.extend({
		init: function(){
			this.params= $('#inspector #properties');
			var tools = $('#tools li');
        	
			tools.each(function(vent, obj){
        		$(obj).click(function(){
        			$jo.tool= $(obj).attr('id');
        			$jo.game.sb.tools[$jo.tool]();
        			
        			tools.each(function(ev, obj2){
        				$(obj2).removeClass('active');
        			});
        			$(obj).addClass('active');        			
        			
        			$('.tool-prop').each(function(ev, obj){
        				$(obj).hide();
        			}); 
        			$('#'+$jo.tool+'-prop').show();         			       			
        			
        		});
        	});
			
			$('#toolprops form').each(function(ev, obj){
				$(obj).submit(function(han){
					var act = $(obj).attr('action');
					$jo.game.sb.action[act+'Submit']();
					return false;
				});
			});
		},
		fillInspector: function(){
			this.params.html('');
			if(this.select && this.select.joObject){
				for(var i in this.select){
					this.addInpectorPair(i, this.select[i]);
				}
			}
		},
		addInspectorPair: function( name, value) {
			var nm = $('label').value(name).attr('for', name+'Field'),
			vl = $('input').value(value).attr('id', name+'Field'),
			li = $('li').append(nm).append(vl);			
			this.params.append(li);
		},
		applyInspector: function(){
			if(this.select && this.select.joObject){
				for(var i in this.select){
					
				}
			}
		},
		tools:{
			pick: function(){},
			settings: function(){
        		var inputs= $('#settings-prop input');
        		inputs.each(function(ev, obj){
        			var type= $(obj).attr('type');
        			if( type!=='reset' && type!=='submit'){
	        			var o = $(this);
	        			o.val($jo.game.map[o.attr('id')]+'');
        			}
        		});
			},
			drag: function(){},
			tile: function(){}
		}
		
	}))();
	return sb;
});