console.log("config配置文件加载了！");

requirejs.config({
	baseUrl:"http://localhost:6060",
	paths:{
		"jquery" : "https://cdn.bootcss.com/jquery/2.2.4/jquery",
		"common" : "/js/mylib/common",
		"carousel" : "/js/mylib/carousel",
		"template" : "/js/lib/template-web",
		"api":"/js/mylib/APIlist"
	}
})