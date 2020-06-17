var path = require('path');
const uglify = require('uglifyjs-webpack-plugin');//引入压缩文件插件
const htmlPlugin = require('html-webpack-plugin');//引入html打包插件
const  cssSplite= require('extract-text-webpack-plugin');

module.exports = {//注意这里是exports不是export
    entry: path.join(__dirname, 'src', 'main.js'),
    output: {//输出目录
        path: path.join(__dirname, 'app'),//打包后的js文件存放的地方
        filename: "general.js",
        publicPath: '/app/',//打包后的js文件名
        library: 'genearl', // library指定的就是你使用require时的模块名
        libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
        umdNamedDefine: true,
    },
    //webpack-dev-server配置
    devServer: {
        contentBase: './app',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        port: 8080//设置默认监听端口，如果省略，默认为"8080"
    },
    module: {
        rules: [
            // // css原生迁移由js添加
            // {
            //     test: /\.css$/,
            //     use: [
            //         { loader: 'style-loader' },
            //         { loader: 'css-loader' }
            //     ]
            // },
                // 把css与main.js分离开
            {
                test:/\.css$/,
                use: cssSplite.extract({
                    fallback: "style-loader",
                    use: [
                        {loader:"css-loader"},
                        {loader:"postcss-loader"},
                    ]
                  }),
            },
            // less文件以及与js文件分离
            {
                test:/\.less$/,
                use: cssSplite.extract({
                    use: [
                        {loader:"css-loader"},
                        {loader:"less-loader"},//less
                    ],
                    fallback: "style-loader",
                  }),
            },
            {
                test: /\.js[x]?$/,//以js或者jsx结尾的文件
                exclude: /node_modules/,//排除node_modules文件夹下的所有文件
                loader: 'babel-loader?presets[]=es2015&presets[]=es2015'
            },
            {
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数,集成了file-loader
                    options:{
                        limit:500,  //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath:'assets/images',
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                 use:[ 'html-withimg-loader'] 
            },
            
        ]
    },
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
            },
            hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
            template:'./src/index.html' //是要打包的html模版路径和文件名称。
           
        }),
        new cssSplite('./assets/style.css'),
    ]
};