
// https://github.com/sorrycc/roadhog#env 可以查看相关的配置
// 可以将webpack.json文件改成js文件，这样扩展性更高
// import px2rem from 'postcss-px2rem'
export default{ 
      // hash打包后的文件名带hash值
      "hash": true,
      html: { // 自动在public的index.ejs导入hash后的文件
        template: './public/index.ejs', 
      },
      "extraBabelPlugins": [ // antd按需导入
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }],
        // ["styled-components-px2rem",{rootValue:75}]
      ],
      // "extraPostCSSPlugins":[
      //   px2rem({
      //     rootValue:75,
      //     propList:['*']
      //   })
      // ],
      // 关掉默认cssmodules
      "disableCSSModules": true,
      "disableCSSSourceMap": true,
      // 开发环境下的跨域代理
      "proxy": {
        "/api": {
          "target": "http://localhost:8080",
          "changeOrigin": true,
          "pathRewrite": { "^/api" : "" }
        }
      },
      // 配置浏览器兼容(默认情况下roadhog已经完成了es6常规语法的兼容，不含装饰器的语法，以及css3语法的兼容）
      "env": {
        "development": {
          "browserslist": [
            "> 1%",
            "last 2 versions"
          ],
          "extraBabelPlugins": [ // 开启热跟新
            "dva-hmr"
          ]
        }
      }
}