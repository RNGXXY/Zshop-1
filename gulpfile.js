let gulp = require("gulp");
let minJS = require("gulp-babel-minify");
let minCSS = require("gulp-clean-css");
let sass = require("gulp-sass");
let connect  = require("gulp-connect");
let imagemin = require('gulp-imagemin');

gulp.task("build",()=>{
	gulp.src("./src/**/*.html").pipe(gulp.dest("./dist"))
	
	gulp.src("./src/**/*.js").pipe(gulp.dest("./dist"))
	
 	gulp.src("./src/**/*.scss") //读取文件
    	.pipe(sass({
    	    outputStyle : "expanded"
   		}))
    	.pipe(minCSS())  //压缩处理
    	.pipe(gulp.dest("./dist"))  //生成到指定目录
});

gulp.task("refreshHTML",()=>{
	gulp.src("./src/**/*.html").pipe(gulp.dest("./dist")).pipe(connect.reload())
})
gulp.task("refreshCSS", ()=>{
    gulp.src("./src/**/*.scss")
        .pipe(sass({
            outputStyle : "expanded"
        })).on('error', sass.logError)
        .pipe(minCSS())
        .pipe(gulp.dest("./dist"))        
})

gulp.task("refreshJS",()=>{
	gulp.src("./src/**/*.js").pipe(gulp.dest("./dist"))
})

gulp.task("server",()=>{
	connect.server({
		name : "yyyyy",
		port : 6066,
		root : "dist",
		livereload : true,
		middleware: function (connect, opt) {
        	var Proxy = require('gulp-connect-proxy');
        	opt.route = '/proxy';
        	var proxy = new Proxy(opt);
        	return [proxy];
  	  }
		
	})
	
	gulp.watch(["./src/**/*.html"],["refreshHTML"]);
	gulp.watch(["./src/**/*.scss"],["refreshCSS","refreshHTML"]);
	gulp.watch(["./src/**/*.js"],["refreshJS","refreshHTML"]);
})
