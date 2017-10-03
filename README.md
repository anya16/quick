

[![Build Status](https://travis-ci.org/Ironsub/quick.svg?branch=master)](https://travis-ci.org/Ironsub/quick)
[![GitHub forks](https://img.shields.io/github/forks/Leotw/quick.svg)](https://github.com/Leotw/quick/network)
# Quick
HTML5 scaffold for web,no react,no angular,no vue.

## Starting

### clone
```bash
git clone https://github.com/Leotw/quick.git
```
### install

```bash
npm install
```
### build a page
```bash
npm run module -- --page mypage
```
### build some pages
```bash
npm run module -- --page mypage1 mypage2 mypage3
```
### dev and preview 
```bash
npm run dev
```
### build
```bash
npm run build
```

## Feature
- just use Js and Jquery achieved MVC without Angular,React or Vue
- support ES6 and other version ECMAScript.
- make a SPA with underscore and director.
- building with webpack and service with express.

## Modules
+ build ------ 存放npm指令配置文件
+ config ------ 存放webpack配置文件
+ public ------ 存放静态资源
+ node_modules ------ 依赖包
+ server.js ------ 构建入口
+ index.html ------ 入口文件
+ src/ ------ 业务逻辑
   * page1/ ------ 自定义页面page1
      * index,js ------ 主逻辑  
      * page1.scss ------ 样式文件
      * page1.html ------ 模板文件
   * page2/ ------ 自定义页面page2
      * index,js ------ 主逻辑  
      * page2.scss ------ 样式文件
      * page2.html ------ 模板文件
   * model/ ------ 模型目录 
      * baseModel.js ------ 模型基类
      * page1Model.js ------ 模型子类
      * page2Model.js ------ 模型子类
   * view/ ------ 视图目录
      * baseView.js ------ 视图基类
      * page1View.js ------ 视图子类
      * page2View.js ------ 视图子类
   * app.js ------ 路由控制
   * main.scss ------ 样式入口

## Usage
### 1.模块解读
#### 自定义页面
所有的自定义页面都将包含model，view，controller三部分。view与model部分都将存放在`view/`与`model/`目录，controller部分将存在在`page[name]/`目录
 + view 
   + pageView
 + model
   + pageModel
 + page(controller)
   + index.js
   + page.html
   + page.scss

#### 模型(model)

所有的PageModel(业务)均继承自基类`BaseModel`
```bash
import { BaseModel } from './baseModel';
class pageModel extends BaseModel {
    constructor(param) {
        super(param);
    }
}
```

#### 视图(view)
所有的PageView均继承自基类`BaseView`
```bash
class PageView extends BaseView {
    constructor(param) {
        super(param);
        this.id = '#detail';
        this.$ele = $('<div id="page" class="view">');
        this.filter();
        this.render();
    }
}
```
#### 控制(controller)

每一张新增的自定义页面(page)的index.js，page.scss，page.html文件都将整体作为controller部分，在 `index.js` 中创建 `PageController ` 类，负责把页面相应的 `model` 部分与 `view` 部分进行融合
```bash
class PageController {
    constructor() {
        //在这里将 PageModel 与 PageView 进行融合
    }
}
```

 - `PageModel`用来获取page的模型数据
 - `PageView`用来生成html页面(需要数据才能生成动态页面)
 - `PageController` 则作为桥梁，负责将 `PageModel` 拿到的数据传入 `PageView` 进行渲染，生成最终的动态网页

### 2.路由解读
每一条url都对应一个方法，处理相应页面的逻辑
```bash
$(function() {
    Router({
        '/': () => {        
        	//do sth
        },
        '/page': () => {
            let pageController = new PageController ();
        },
        '/list': () => {
        	//do sth
        }
    }).init('/');
});
```
### 3.开发
当添加需要进行开发的页面时，可以进行手动创建，也可以使用`npm`命令进行快速创建
#### 创建一张页面：在`--page` 后面键入一个空格，然后输入页面名称
```bash
npm run module -- --page mypage
```
#### 创建多张页面：在`--page` 后面键入一个空格，然后输入多个页面名称，页面名称以空格进行分隔
```bash
npm run module -- --page mypage1 mypage2 mypage3
```

src目录：每创建一张页面 `mypage**`，都将生成 `mypage**Model.js`、`mypage**View.js`，并自动添加在 `baseModel.js`、`baseView.js`之后，同时会在 `src/` 下生成 `mypage**` 目录，包含：`index.js`、`mypage**.html`、`mypage**.scss` 三个文件  
+ src/ ------ 业务逻辑
   * model/ ------ 模型目录 
      * baseModel.js ------ 模型基类
      * mypage1Model.js ------ 模型子类
      * mypage2Model.js ------ 模型子类
      * .....
   * view/ ------ 视图目录
      * baseView.js ------ 视图基类
      * mypage1View.js ------ 视图子类
      * mypage2View.js ------ 视图子类
      * .....
   * mypage1/ ------ 自定义页面mypage1
      * index,js ------ 主逻辑  
      * mypage1.scss ------ 样式文件
      * mypage1.html ------ 模板文件
   * mypage2/ ------ 自定义页面mypage2
      * index,js ------ 主逻辑  
      * mypage2.scss ------ 样式文件
      * mypage2.html ------ 模板文件
   * mypage3/ ------ 自定义页面mypage3
   * ....
   * app.js ------ 路由控制
   * main.scss ------ 样式入口

#### 建立mypage的模型 继承自基类 `BaseModel` ，具体获取数据的方法(通过异步或是缓存等等)都可以自定
```bash
// mypageModel.js

import { BaseModel } from './baseModel';
class MypageModel extends BaseModel {
    constructor(param) {
        super(param);
    }
}
export { MypageModel };
```
#### 建立mypage的视图 继承自基类 `BaseView`，每个视图类需要一个唯一 `id`和 `<div id="mypage" class="view">`
```bash
//mypageView.js

import _ from 'underscore';
import $ from 'jquery';
import { BaseView } from './baseView';
class MypageView extends BaseView {
    constructor(param) {
        super(param);
        this.id = '#mypage';
        this.$ele = $('<div id="mypage" class="view">');
        this.filter();
        this.render();
    }
}
export { MypageView };
```
#### mypage主逻辑部分开发 打开`mypage/`目录
模板渲染  mypage.html
> mypage.html并不是真正的html文件，而是[undescore](http://underscorejs.org/)的模板引擎所需要的基础文件
```bash
//mypage.html

<div class="mypage">
    <ul>
        <% _.each(body,function(e,i){%>
        <li>
        	<span><%= e.name %></span>
        	<span><%= e.des %></span>
        	<span><%= e.date %></span>
        </li>
        <% })%>
    </ul>
</div>
```
在index.js中将获取的模板文件page.html存入变量tpl
```bash
//index.js

var tpl = require('./mypage.html');
```
在index.js的MypageController类的构造函数中获取mypage的模型数据
```bash
//index.js

constructor(){
    ...
    let result = new MypageModel().toString();  //通过MypageModel的toString方法获取自定义页面mypage的模型，存入result
    ...
}
```
在index.js的MypageController类的构造函数中进行model与view的融合
```bash
//index.js

constructor(){
    ...
    let param = {};
    param.template = tpl;               //将模板文件存入新建对象param的template属性当中
    param.model = result;               //将获取的page的模型存入新建对象param的model属性当中
    let pageView = new PageView(param); //将page相对应的PageView类进行实例化，并传入param进行渲染
    ...
}
```
完整的index.js文件
```bash
//index.js

import $ from 'jquery';                             //jquey作为主要工具库，很多地方都有可能需要引入
import { MypageModel } from '../model/mypageModel';    //引入相应的model
import { MypageView } from '../view/mypageView';       //引入相应的view
require('./mypage.scss');                            //引入相应的mypage.scss
var tpl = require('./mypage.html');                  //引入相应的mypage.html，做模板渲染的基础文件
class MypageController {
    constructor() {
        this.shut();
        let param = {};
        let result = new MypageModel().toString();
        param.template = tpl;
        param.model = result;
        let mypageView= new MypageView(param);
    }
    shut() {
        $('view').hide();
    }
};
export { MypageController };
```
#### 添加到app.js文件
引入jquery模块与director模块
> 项目的主要逻辑依赖[jquery](https://github.com/jquery/jquery)，路由管理依赖[director](https://github.com/flatiron/director)
```bash
//app.js

import $ from 'jquery';
import D from 'director/build/director';
```
拿到director的Router方法
> director的引入需要引入到director/build/director，这是因为director的UMD规范没有完善而造成，在此不做详细解读

```bash
//app.js

var Router = D.Router;
```
配置路由并使用jquery的dom加载方法进行入口的初始化，在各个路由项目中将所对应的 `MypageController` 类进行实例化
```bash
//app.js
...
import { MypageController } from './mypage';
$(function() {
    Router({
        '/mypageUrl': () => {
            let mypageController = new MypageController();
            //do sth...
        }
    }).init('/');
});
```
## About
 - 这是一个轻量级的业务级别的MVC单页面应用框架，由于不借助任何MV**框架，使得打包后的体积很小
 - 非常适合对各类主流框架短时间内不熟悉或者刚从requirejs过渡的童鞋，可以使用灵活的js代码
 - 使用underscore的模板引擎进行快速渲染，适合开发没有大量数据绑定的项目
 - 项目所依赖的无论是前端类库(可通过bower安装的)还是node包都统一存入 `node_modules` 中，不再使用 `bower install`
## Thanks to
@[yaoazhen](https://github.com/yaoazhen)
