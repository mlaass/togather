define(['./lib/jo/jo', './lib/jquery-1.5.2.min'], function(jo, jq){
	var sb = new (jo.Class.extend({
		init: function(){
			this.params= $('#inspector #properties');
		},
		setup: function(){
			
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
					$jo.game.sb.actions[act+'Submit']($(obj));
					return false;
				});
			});
			var eselect = $('#add-entity select');
			for(var i in jo.game.entitylist){
				eselect.append($('<option>').html(jo.game.entitylist[i]));
			}
			
			var tselect = $('#tile-prop #tile-select'), 
			tiles = $jo.game.ts.getCss();
			
			for(var i in tiles){
				tselect.append($('<li>').attr('style', tiles[i]).attr('name', i));
			}
			tiles = $('li', tselect);
			tiles.each(function(ev,obj){
				$(obj).click(function(){
					tiles.removeClass('selected');
					$(obj).addClass('selected');
					$jo.game.tileBrush = parseInt($(obj).attr('name'));
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
			var nm = $('<label>').value(name).attr('for', name+'Field'),
			vl = $('<input>').value(value).attr('id', name+'Field'),
			li = $('<p>').addClass('pair').append(nm).append(vl);			
			this.params.append(li);
		},
		applyInspector: function(){
			if(this.select && this.select.joObject){
				for(var i in this.select){
					
				}
			}
		},
		actions:{
			addEntitySubmit: function(form){
				var ent =form.find('select').val();
				alert(ent);
			},
			mapSettingsSubmit: function(form){
				var w=$('#width').val(), h=$('#height').val();
        		w= parseInt(w), h=parseInt(h);
        		$jo.game.map.resize(w,h, {index: -1});
			}
		},
		tools:{
			pick: function(){
				
			},
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