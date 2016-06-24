'use strict';

/*引入gulp*/
var gulp = require('gulp');

/*css*/
var sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css');
/*嵌入式样式*/
var styleInject = require("gulp-style-inject");
/*图片*/
var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cssBase64 = require('gulp-css-base64');
/*js*/
var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');
/*browserSync*/
var browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
/*...*/
var notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    // livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber');
/*生成iconfont的相关组件*/
var iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    template = require("gulp-template"),
    fs = require("fs"),
    fontName = 'ifontIndex', //font文件的名称
    icons_dir = "app/icons", //字体图标的目录
    icons = fs.readdirSync(icons_dir);
icons = icons.map(function(icon) {
    return icon.replace(/\.\w+$/, '');
});
/*ejs*/
var ejs = require("gulp-ejs"),
    prettify = require('gulp-prettify');

/*监听文件*/
// gulp.task('watch', function() {
//     /* 所有.scss档*/
//     gulp.watch('./app/scss/*.scss', ['sass']);
//     /*livereload监听app下所有文件变化*/
//     livereload.listen();
//     gulp.watch('./app/**/*.*', function(file) {
//         livereload.changed(file.path);
//     });
//     // 所有.js档
//     // gulp.watch('src/scripts/**/*.js', ['scripts']);
//     // 所有图片档
//     //gulp.watch('./app/images/*.*', ['imagemin']);
// });

/*静态服务器 + 监听 scss/html 文件*/
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8020,
        open: false, //停止自动打开浏览器
        // browser: "C:\\Users\\cjf\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe", //在Chrome浏览器中打开,浏览器类型和路径根据个人情况设定
        notify: false, //不显示在浏览器中的任何通知
        reloadDelay: 1000
    });
    gulp.watch("./app/scss/*.scss", ['sass']);
    gulp.watch("./app/views/*.html", ['ejs']);
    gulp.watch(["./app/js/**/*.js"]).on('change', reload);
    gulp.watch(["./app/images/*.*"]).on('change', reload);
});

/*ejs模板生成html并格式化，外联式样式转为嵌入式样式，对其监听,
其中外联式样式转为嵌入式样式的做法: 把以下一行内容放置在嵌入式样式在html中想要放置的位置
<!-- inject-style src="./app/scss/ifont.scss" -->
*/
gulp.task('ejs', function() {
    gulp.src("./app/views/*.html")
        .pipe(ejs({
            msg: "Hello Gulp!"
        }))
        .pipe(styleInject())
        .pipe(prettify({ indent_size: 4 }))
        .pipe(gulp.dest("./dist/views"))
        .pipe(reload({ stream: true }));
});

/* 编译Sass并自动给css添加前缀*/
gulp.task('sass', function() {
    return sass('./app/scss/*.scss', { style: 'compact', precision: 4, sourcemap: true })
        .pipe(plumber())
        .pipe(autoprefixer({
            supports: false,
            browsers: ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 10', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        //.on('error', sass.logError))
        .pipe(gulp.dest('./app/css'))
        .pipe(reload({ stream: true })) /*scss编译后的css将注入到浏览器里实现更新*/
        .pipe(notify({ message: 'common css task is completed!' }));
});

/* 检查脚本 */
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/*独立任务--iconfont：生成iconfont以及css和html*/
gulp.task('iconfont', function() {
    return gulp.src(icons_dir + '/*.svg')
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'app/scss/templates/_ifont.scss',
            /*targetPath & fontPath 是先对路径*/
            targetPath: '../scss/ifontIndex.scss',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest('app/fontsIndex/'));
});
gulp.task('icon_css', ['iconfont'], function() {
    gulp.run('sass');
});
gulp.task('icons', ['icon_css'], function() {
    return gulp.src('app/example/iviews/ifont.html')
        .pipe(template({ icons: icons }))
        .pipe(gulp.dest("app/example"));
});

/*独立任务--雪碧图：生成雪碧图以及scss*/
gulp.task('spritesmith', function() {
    var dir = "sprite";
    return gulp.src(['./app/images/' + dir + '/*.png']) //需要合并的图片地址
        .pipe(spritesmith({
            imgName: dir + '.png', //合并后图片的名称
            cssName: '../scss/' + dir + '.scss', //保存合并后对于css样式的地址
            padding: 2,
            algorithm: 'binary-tree', //Algorithm 有四个可选值分别为top-down、left-right、diagonal、alt-diagonal、binary-tree
            cssTemplate: function(data) {
                    var arr = [];
                    arr.push("." + dir + "{" + "background: url(../images/" + dir + ".png) no-repeat;}\n");
                    data.sprites.forEach(function(obj) {
                        arr.push(".i-" + obj.name +
                            "{" +
                            "display:inline-block;background-position: " + obj.px.offset_x + " " + obj.px.offset_y + ";" +
                            "width: " + obj.px.width + ";" +
                            "height: " + obj.px.height + ";" +
                            "}\n");
                    });
                    return arr.join("");
                } //生成css的模板文件
        }))
        .pipe(plumber())
        .pipe(gulp.dest('./app/images'));
});

/* 开发环境入口*/
gulp.task('default', function() {
    console.log('basic tasks completed, now going to watch changes....');
    return gulp.run('serve');
});

/*---------app与dist分隔符----------*/
//压缩图片
gulp.task('imagemin', function() {
    return gulp.src('./app/images/**/*.{png,jpg,gif}')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/images'))
        .pipe(imagemin({ progressive: true, use: [pngquant()] }))
        .pipe(gulp.dest('./dist/images'))
        .pipe(notify({ message: 'images compression task is completed!' }));
});

/*压缩css*/
gulp.task('minifyCss', function() {
    return gulp.src('./app/css/**/*.css')
        .pipe(plumber())
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify({ message: 'minify css task is completed!' }));
});
/*小的背景图转换成base64*/
gulp.task('base64', ['minifyCss'], function() {
    return gulp.src('./dist/css/*.css')
        .pipe(cssBase64({
            maxWeightResource: 100,
            extensionsAllowed: ['.png']
        }))
        .pipe(gulp.dest('./dist/css'));
});

/*-----总入口-----*/
/* 发布环境入口:移动所有文件到dist文件夹*/
gulp.task('dist', ['clean'], function(cb) {
    //views,fonts,js copy to dist...
    gulp.run('imagemin');
    gulp.run('base64');
    gulp.src('./app/js/**/*.*')
        .pipe(plumber())
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
    gulp.src('./app/fonts/**/*.*')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./app/views/**/*.*')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/views'));
    gulp.src('./app/*.appcache')
        .pipe(plumber())
        .pipe(gulp.dest('./dist'));
    gulp.src('./app/json/*.*')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/json'));
    cb(console.log('distribution  completed....'));
});

gulp.task('clean', function() {
    return gulp.src('./dist/**/*.*', { read: false })
        .pipe(clean());
});
