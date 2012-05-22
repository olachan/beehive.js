/*!
 * Beehive v0.1.0
 *
 * Copyright 2012, Simon Guo
 * Email:simonguo.2009@gmail.com
 * Date: 05/09/2012
 */
(function(){
	var	_head=document.head ||document.getElementsByTagName("head")[0];	//container
	var _file={}, _module={};	
	
	_file.load=function(callback){
		this.onload=this.onreadystatechange=function() {
			if (!this.readyState || this.readyState==='loaded' || this.readyState==='complete') {
				
				if(callback) {
					callback(_module);
				}
				this.onload=this.onreadystatechange=null;
			}
		},
		this.onerror=function(){
			console.warn('model not found: '+(this.src||this.href));
			this.onerror=null;	
		}
		_head.appendChild(this);
	}
	
	_file.js=function(url){
		var f=document.createElement('script');
			f.type='text/javascript';
			f.async='true';
			f.src=url;
			return f;
	}
	_file.css=function(url){
		var f=document.createElement('link');
			f.type='text/css';
			f.rel='stylesheet';
			f.href=url;
			return f;
	}
	
	var _beehive=function(){
		try{
		var bees=arguments,
		incubate=function(bee,callback){
			var url=bee.split('?')[0],
				t=url.toLowerCase().substring(url.lastIndexOf('.')+1);	
				_file.load.call(_file[t](url),callback);
		};
		_file.index=0;
		_module= {
			load:function(){
				this[arguments[0]||"parallel"]();
			},
			//parallel load
			parallel:function(){
				for(var i=0;i<bees.length;i++){
					if(typeof bees[i]==="function"){
						bees[i]();
						continue;
					}
					incubate(bees[i]);
				} 
			},
			//stackline load
			stackline:function(){
				if(typeof bees[_file.index]==="function"){
					bees[_file.index]();	
					_file.index++;
					if(_file.index==bees.length)return;
				}
				incubate(bees[_file.index],function(o){
					_file.index++;
					if(_file.index==bees.length)return;
					o.stackline();
				});
			}
		};
		return _module;
		}catch(e){
			alert(e);	
		}
	}
	
	window.Beehive=_beehive;
})()


