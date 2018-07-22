webmaster
====
VUE版本的站长端

## 更新日志

- 创建项目
    - 使用yarn做包管理工具`yarn init` 初始化 `pacckage.json`
    - 按照`vue-cli`生成的文件添加所需要的package

## 目标
    1. PC移动端通用，支持两种打包模式
    2. 探索https://developers.google.com/web/tools/chrome-devtools/?hl=zh-cn的写法

## package说明

- `autoprefixer`解析CSS文件并且添加浏览器前缀到CSS规则
    ```css
    a{
     transition :transform 1s
    }
    ```
    转换后
    ```css
    a{
     -webkit-transition :-webkit-transform 1s;
     transition :-ms-transform 1s;
     transition :transform 1s
    }
    ```

- [`chalk`](https://segmentfault.com/a/1190000011808938)彩色的console
    ```javascript
    console.log(require('chalk').yellow.bold.bgGreen('hello'))
    console.log(require('chalk')`{red.bold.bgWhite Hello World}`)
    ```

- [`copy-webpack-plugin`](https://medium.com/a-beginners-guide-for-webpack-2/copy-all-images-files-to-a-folder-using-copy-webpack-plugin-7c8cf2de7676)
    > Copy files and directories in webpack 复制静态资源到打包目录

    - 如果静态资源在html中写，webpack的入口文件以及所有依赖中无法监测到依赖了此静态资源，则需要将资源使用copywebpackplugin打包到`dist`目录中

- [`extract-text-webpack-plugin`](https://medium.com/a-beginners-guide-for-webpack-2/extract-text-plugin-668e7cd5f551)
    >As our css will grow , we would wish to have our CSS generated in a separate text file like app.bundle.css instead of having all the css included within the `<style>` tags on the html file

- [`url-loader`](https://medium.com/a-beginners-guide-for-webpack-2/handling-images-e1a2a2c28f8d)
    > **Converting images to base64 strings** and storing those inline in the code is okay for smaller-size images, however with larger images, the size of the application package will grow significantly to out-weigh the advantage of saving on a trip to server for fetching the image. For this, url-loader provides an option — **limit**. With limit specified, the url-loader will convert only those images to base64 string that have sizes up to the specified limit.

- [`friendly-errors-webpack-plugin`](https://github.com/geowarin/friendly-errors-webpack-plugin)
    >友好的提示信息

    ![1]

- [`html-webpack-plugin`](https://github.com/jantimon/html-webpack-plugin#configuration)
    > 将chunk都以`<script>`注入到html模板中

- [`node-notifier`](https://github.com/mikaelbr/node-notifier)
    > 调用系统提示信息

    ![2]

- [`optimize-css-assets-webpack-plugin`](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
    > 删除重复的css(deduped:删除重复数据)

- [`ora`](https://github.com/sindresorhus/ora)
    > 展示`Loading`等各种状态表示

    ![3]

- [`rimraf`](https://github.com/isaacs/rimraf)
    >node版本的额 `rm -rf`

- [`semver`]()
    >语义化表示代码

    - < Less than
    - <= Less than or equal to
    - \> Greater than
    - \>= Greater than or equal to
    - = Equal If no operator is specified, then equality is assumed, so this operator is optional, but MAY be included

- [`shelljs`](https://github.com/shelljs/shelljs#shelljs---unix-shell-commands-for-nodejs)
    >Unix shell commands for Node.js











[1]:https://camo.githubusercontent.com/8626811b709addc6e4e953b1ed2d3414fc843522/687474703a2f2f692e696d6775722e636f6d2f4d6b554568597a2e676966
[2]:https://raw.githubusercontent.com/mikaelbr/node-notifier/master/example/input-example.gif
[3]:https://github.com/sindresorhus/ora/raw/master/screenshot.svg?sanitize=true