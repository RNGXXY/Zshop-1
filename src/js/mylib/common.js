

define([],function(){
	return{
		randomColor:function(){
			var R = randomInt(0,255);
			var G = randomInt(0,255);
			var B = randomInt(0,255);
			return "rgb("+R+","+G+","+B+")";
		},

 		randomInt:function(min, max){
			return Math.floor(Math.random()*(max-min)) + min;
		},

		//函数节流 设置一个时间 当请求的时间超过这个设定的时间时 才会触发该函数
		throttle:function(callback,duration=400,context){	//回调函数，时间间隔（），执行环境
			var lasttime = 0;
			return function(){
				var now = new Date().getTime();
				if (now-lasttime > duration) {
					callback.call(context);
					lasttime = new Date().getTime();
				}
			}
		},
		
		//函数防抖
		debounce:function(callback,duration=400,contest){	//回调函数，时间间隔（），执行环境
			var t = null;
			return function(){
				clearTimeout(t);
				t=setTimeout(()=>{
					callback.call(contest);		//
				},duration)
			}
		},
		
		//函数柯里化（懒加载）
		addEvent:function(ele,eventname,fn,isCaopture){
			if (window.VBArray) {
				ele.attachEvent("on"+eventname,fn);
				addEvent = function(ele,eventname,fn){
					ele.attachEvent("on"+eventname,fn);
				}
			} else{
				ele.addEventListener(eventname,fn,isCaopture);
				addEvebt = function(ele,eventname,fn,isCaopture){
					ele.addEventListener(eventname,fn,isCaopture);	
				}
			}
		}
	}
})