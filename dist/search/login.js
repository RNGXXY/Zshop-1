console.log("login.js执行了，接下来，准备加载配置文件！");

require(["../js/config"],function(){

	require(["jquery","search"],function($){

		$.prototype.focuss();	//搜索框
	})
	
});