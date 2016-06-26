
/* 
* @Author: yyh
* @Date:   2016-01-11 10:45:07
*/
'use strict';

// 引入 gulp
var gulp = require('gulp'); 
//参数配置
var appDir = "app/",
    distDir = "dist/";

// 引入组件
var notify = require('gulp-notify'),
   jshint = require('gulp-jshint'),

   sass = require('gulp-ruby-sass'),
   minifyCss = require('gulp-minify-css'),
   autoprefixer = require('gulp-autoprefixer'),
   //concat = require('gulp-concat'),
   //uglify = require('gulp-uglify'),
   rename = require('gulp-rename'),

   
   imagemin = require('gulp-imagemin'),
   pngquant = require('imagemin-pngquant'),
   clean = require('gulp-clean'),
   plumber  = require('gulp-plumber');


//监控程序
gulp.task('watch', function() {
  // 所有.scss档
  gulp.watch('./app/scss/*.scss',['sass']);
  // 所有.js档
 // gulp.watch('src/scripts/**/*.js', ['scripts']);
  // 所有图片档
  //gulp.watch('./app/images/*.*', ['imagemin']);
});

// 编译Sass
gulp.task('sass', function() {
    /* return gulp.src('./app/*.scss')
        .pipe(plumber())
        .pipe(sass({style:'compact'}).on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
        .pipe(notify({ message: 'common css task is completed!' }));*/
   return sass('./app/scss/*.scss',{style:'compact',precision:4})
          .pipe(plumber())
          .pipe(autoprefixer({
            supports: false,
            browsers: ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 10', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'],
            cascade: false
        }))
           .pipe(gulp.dest('./app/css'))
           .pipe(notify({ message: 'common css task is completed!' }));
}); 

/*gulp.task('concat:css', ['sass'], function(cb) {
    return gulp.src(['./app/css/reset.css', './app/css/sprite.css'])
        .pipe(plumber())
        .pipe(concat('_reset.css'))
        .pipe(gulp.dest('./app/css'))
        .pipe(notify({ message: 'css comb task is completed!' }));
    //cb(console.log("css comb task finished!"));
});*/


/*-----app-----app与build分隔符-----bulid-----*/
//压缩图片
gulp.task('imagemin', function(){
    return gulp.src('./app/images/*.{png,jpg,gif}')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/images'))
        .pipe(imagemin({progressive: true,use: [pngquant()]}))
        .pipe(gulp.dest('./dist/images'))
        .pipe(notify({ message: 'images compression task is completed!' }));
});




/*// 检查脚本*/
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


/*-----总入口-----*/
//独立任务--雪碧图：在app环境下生成雪碧图以及scss
gulp.task('spritesmith',function(){
  var dir = "sprite";
    return gulp.src(['./app/images/'+ dir +'/*.png'])//需要合并的图片地址
        .pipe(spritesmith({
            imgName: dir + '.png',//合并后图片的名称
            cssName: '../scss/'+dir+'.scss',//保存合并后对于css样式的地址
            padding: 2,
            algorithm: 'binary-tree',//Algorithm 有四个可选值分别为top-down、left-right、diagonal、alt-diagonal、binary-tree
            cssTemplate: function (data) {
                var arr=[];
                arr.push("."+dir+"{"+"background: url(../images/"+dir+".png) no-repeat;}\n");
                data.sprites.forEach(function (obj) {
                    arr.push(".i-"+obj.name+
                    "{" +
                    "display:inline-block;background-position: "+obj.px.offset_x+" "+obj.px.offset_y+";"+
                    "width: "+obj.px.width+";"+
                    "height: "+obj.px.height+";"+
                    "}\n");
                });
                return arr.join("");
            }//生成css的模板文件
        }))
        .pipe(plumber())
        .pipe(gulp.dest('./app/images'));
});


// 开发环境入口： 1.雪碧图制作 2.生成合并的css 3.检查js 4.watch
gulp.task('minifyCss', function(){
	  return gulp.src('./app/css/*.css')
	  	.pipe(plumber())
  //    .pipe(uglify())
        .pipe(gulp.dest('./dist/css'));
});


// 开发环境入口： 1.雪碧图制作 2.生成合并的css 3.检查js 4.watch
gulp.task('default', ['sass'], function(){
    console.log('basic tasks completed, now going to watch changes....');
    return gulp.run('watch');
});

// 发布环境入口:移动所有文件到dist文件夹
gulp.task('dist', ['minifyCss', 'imagemin'], function(cb){
//views,fonts,js copy to dist...

  gulp.src('./app/js/**/*.*')
      .pipe(plumber())
  //    .pipe(uglify())
      .pipe(gulp.dest('./dist/js'));

    gulp.src('./app/fonts/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/fonts'));

    gulp.src('./app/views/**/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('./dist/views'));

    cb(console.log('distribution  completed....'));
});

/*//回调函数的用法*/
// gulp.task('c', function (cb) {
//     gulp.src('./app/scss/**/*.scss')
//         .pipe(sass({style:'compressed'}).on('error', sass.logError))
//         .pipe(gulp.dest('./app/css'));
//   cb(console.log("a finish")); 
// });