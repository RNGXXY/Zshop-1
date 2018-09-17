
console.log("第一个执行了，接下来加载配置文件");

require(["js/config/config"],function(){

	//固定头部
	require(["jquery","common"],function($,common){
		$(window).scroll(common.throttle(()=>{		//滚动页面到一定距离是左边导航出现，函数防抖
			if ($(this).scrollTop()>400) {
				$(".headerin").addClass("headerinfixed");
			}
			else{
				$(".headerin").removeClass("headerinfixed");
			}
		},100,window));
	})

	//搜索框
	require(["jquery","common"],function($,common){
		var searchInput = $(".search-text")[0];
		var droplist = $(".droplist")[0];
			searchInput.addEventListener("input",function(){
				$.ajax({
					//url : `http://suggestion.baidu.com/?wd=${this.value}&cb=callback`,
					url: `https://suggest.taobao.com/sug?code=utf-8&q=${this.value}&_ksTS=1536741200555_509&callback=callback&k=1&area=c2c&bucketid=17`,
					dataType:"jsonp",
					success : function(data){
						//console.log(data);
						//callback(data);
						common.debounce(callback(data),this)
					}
				});
			})
		
		//jsonp的回调函数
		function callback(data){
			//data是服务器返回给浏览器的数据
			
			droplist.innerHTML="";
			data.result.forEach(item=>{		
				var li = document.createElement("li");
				li.innerHTML=item[0];
				droplist.appendChild(li);
			})
			droplist.style.display = "block";
		}
	})

	//城市下拉列表
	require(["jquery"],function(){
		$(".city-location").mouseenter(function(){
			$(".city-list").show();
		})
		$(".city-location").mouseleave(function(){
			$(".city-list").hide();
		})
		$(".city-list li:gt(0)").children().mouseenter(function(){
			$(this).addClass("lihover");
		})
		$(".city-list li:gt(0)").children().mouseleave(function(){
			$(this).removeClass("lihover");
		})		
	})
	
	//轮播图
	require(["jquery", "carousel"], function($) {
		$(function() {
			$('#carousel1').carousel({
				el: {
					imgsContainer: '.carousel', // 图片容器
					prevBtn: '.carousel-prev', // 上翻按钮
					nextBtn: '.carousel-next', // 下翻按钮
					indexContainer: '.carousel-index', // 下标容器
				},
				conf: {
					auto: true, //是否自动播放 true/false 默认:true
					needIndexNum: true, //是否需要下标数字 true/false 默认:true
					animateTiming: 1000, //动画时长(毫秒) 默认:1000
					autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
					direction: 'right', //自动播放方向 left/right 默认:right
				}
			});

		})
	})

	//全部分类
	require(["jquery"],function($){
		var pos;
		$(".category-items .item").mouseenter(function(){			
			var $itemIndex=$(this).index();	//手机、电脑……下标
			$(".category-dropdown").show();
			let positionArr= [];
			pos = $(this).children("i").css("background-position");	//记录i标签背景的position
			positionArr.push(pos);			
			//position[0][0]="-30px";
			var newpositionArr=positionArr.toString().split(" ");
			newpositionArr[0]="-30px";
			//console.log(newpositionArr.join(" "));
			$(this).children("i").css("background-position",newpositionArr.join(" "));	//改变i标签的背景位置
			$("#category-item-"+($itemIndex+1)).show().siblings().hide();
			$(".category-dropdown").mouseenter(function(){
				$(this).show();
			})
		});
		$(".category-items .item").mouseleave(function(){
			$(this).children("i").css("background-position",pos);

			$(".category-dropdown").hide();
			$(".category-dropdown").mouseleave(function(){
				$(this).hide();
			})
		})
	})

	//团购右，ajax请求数据
	require(["jquery","template","api"],function($,template,api){
		var data1=[] ;
		$(function(){
			$.ajax({
				type:"get",
				dataType:"jsonp",
				url:api.tuangou1,
				success:function(data){
					callback1();
				}
			})
			
			window.callback1=function(data){
				data1.push(data.lst[2]);
				data1.push(data.lst[3]);
				data1.push(data.lst[6]);
				$(".tuan_ware-arrival").load("http://localhost:6066/pages/templates/tuangou1.html",function(){
					var tempstr = template("tuangou-right",{
						tuangou1List:data1
					});
					$(".tuan_ware-arrival").html(tempstr);
				});				
			}
		})
	})


	//团购中，ajax请求数据
	require(["jquery","template","api"],function($,template,api){
		var tuangou2map=new Map() ;
		$(function(){
			$.ajax({
				type:"get",
				dataType:"jsonp",
				url:api.tuangou2,
				success:function(data){
					callback2();
				}
			})
			
			window.callback2=function(data){
				let needdata = data.lst;
				for(var index=0; index<data.lst.length;index++){
					if(index<6){	//只要六个数据
						tuangou2map.set(needdata[index].pid,{
							pid : needdata[index].pid,
							pname : needdata[index].pn,
							price : needdata[index].price,
							imgsrc : needdata[index].iurl,
							purl: needdata[index].purl
						});
					}
				}

				$(".tuan_ware-list").load("http://localhost:6066/pages/templates/tuangou2.html",function(){
					let tempstr = template("tuangou-middle",{
						list : tuangou2map
					});
					$(".tuan_ware-list").html(tempstr);

					//鼠标效果
					$(".tuan_ware-list .item").mouseenter(function(){
						console.log("ss");
						$(this).find(".function-upward_hover").stop().animate({"height":"52px"},200);
					});
					$(".tuan_ware-list .item").mouseleave(function(){
						$(".function-upward_hover").stop().animate({"height":0},200);
					})
				});	

			};
			
		})
	});

	
	//同城购，ajax请求数据
	require(["jquery","template","api"],function($,template,api){
		var tcgmap=new Map() ;
		$(function(){
			$.ajax({
				type:"get",
				dataType:"jsonp",
				url:api.tongchenggou,
				success:function(data){
					tongchenggou();
				}
			})
			
			window.tongchenggou=function(data){
				let needdata = data.lst;
				for(var index=0; index<data.lst.length;index++){
					if(index<5){	//只要5个数据
						tcgmap.set(needdata[index].pid,{
							pname : needdata[index].pn,
							pid : needdata[index].pid,
							sid	: needdata[index].sid,
							price : needdata[index].price,
							gprice : needdata[index].gprice,
							imgsrc : needdata[index].iurl,
							purl: needdata[index].purl
						});
					}else{
						break;
					}
				}
				$(".citywide-ware_list").load("http://localhost:6066/pages/templates/tongchenggou.html",function(){
					let tempstr = template("tongchenggou-xs",{
						list : tcgmap
					});
					$(".citywide-ware_list").html(tempstr);

				});	

			};
			
		})
	});
	
	//Z智选-top
	require(["jquery"],function($){
		$(".noopsyche-focus_tab li").mouseenter(function(){
			$(this).addClass("active").siblings().removeClass("active");
			let index=$(this).index();
			//var arr = $(".noopsyche-focus_slide_list li");
			//console.log(arr[index].siblings());
			$("#noopsyche-focus_pic"+(index+1)).show().siblings().hide();
			//console.log($(".noopsyche-focus_slide_list li")[index].siblings());
			//$(".noopsyche-focus_slide_list li")[index].css("display","list-item").siblings().css("display","none");
		})
	})
	
	//品牌精选,ajax请求数据
	require(["jquery","template","api"],function($,template,api){
		let map=new Map() ;
		$(function(){
			$.ajax({
				type:"get",
				dataType:"jsonp",
				url:api.dell,
				success:function(data){
					dellselect();
				}
			})
			
			window.dellselect=function(data){
				let needdata = data.lst;
				for(var index=0; index<data.lst.length;index++){
					if(index<4){	//只要4个数据
						map.set(needdata[index].pid,{
							pname : needdata[index].pn,
							pid : needdata[index].pid,
							sid	: needdata[index].sid,
							price : needdata[index].price,
							gprice : needdata[index].gprice,
							imgsrc : needdata[index].iurl,
							purl: needdata[index].purl
						});
					}else{
						break;
					}
				}
				console.log(map);
				$(".choice-brand_list").load("http://localhost:6066/pages/templates/selected.html",function(){
					let tempstr = template("select",{
						list : map
					});
					$(".choice-brand_list").html(tempstr);

				});	

			};
		
		})
	});

})

