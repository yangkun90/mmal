var webpack = require("webpack");
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
//更新html模板，自动跟新引入link src
var HtmlWebpackPlugin   = require('html-webpack-plugin');
// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
// console.log(process.env.WEBPACK_ENV+'dddddd'); //测试配置环境变量
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',//模板路径
        filename    : 'view/' + name + '.html',//文件名称生成路径
        title       : title,//html页面的title名
        inject      : true,//表示js打包到body后，默认
        hash        : true, //是否生成随机字符串到连接末尾
        chunks      : ['common', name] //引入哪些模块
    };
};
/**
 * webpack配置 杨坤
 */
var config={
    //入口
    entry:{
        'common':['./src/page/common/index.js'],//全局模块，名字和下面的插件配置相同，表示这个js可以写公共js代码
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    //输出
    output:{
        path:'./dist',
        publicPath : '/dist',
        filename:'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module: {
        //loaders 加载配置
        loaders: [
            //使用style嵌入到js方式后，然后使用扩展插件单独提取出来成为单独的css
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            //url外部加载的文件采用 url_loader加载包括图片和字体文件
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        ]
    },
    plugins:[
        //公共代码部分打包
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js' //名字
        }),
         // 把css单独打包到文件里 单独打包
         new ExtractTextPlugin("css/[name].css"),
         //html模板的处理
         new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    ]
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports=config