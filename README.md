

[![Build Status](https://travis-ci.org/Ironsub/quick.svg?branch=master)](https://travis-ci.org/Ironsub/quick)
![node](https://img.shields.io/badge/node->=7.0.0-brightgreen.svg)
[![GitHub issues](https://img.shields.io/github/issues/Leotw/quick.svg)](https://github.com/Leotw/quick/issues)
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
### preview 
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

#### 模型

所有的PageModel(业务)均继承自基类`BaseModel`
```bash
// pageModel.js

import { BaseModel } from './baseModel';
class pageModel extends BaseModel {
    constructor(param) {
        super(param);
    }
}
export { pageModel };
```

#### 视图
所有的PageView均继承自基类`BaseView`
```bash
//pageView.js

import _ from 'underscore';
import $ from 'jquery';
import { BaseView } from './baseView';
class PageView extends BaseView {
    constructor(param) {
        super(param);
        this.id = '#detail';
        this.$ele = $('<div id="page" class="view">');
        this.filter();
        this.render();
    }
}
export { PageView };
```
#### 控制

每一张新增的自定义页面(业务)的index.js，page.scss，page.html文件都将整体作为controller部分，`index.js`将作为页面主逻辑，负责把页面相应的`model`部分与`view`部分进行融合<br><br>
模板渲染
> page.html并不是真正的html文件，而是[undescore](http://underscorejs.org/)的模板引擎所需要的基础文件
```bash
//page.html

<div class="page">
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
在index.js中将获取的模板文件`page.html`存入变量`tpl`
```bash
var tpl = require('./page.html'); 
```
在index.js的`PageController`类的构造函数中进行`model`与`view`的融合
```bash
let result = new PageModel().toString();  //通过PageModel的toString方法获取自定义页面page的模型，存入result
```
在index.js的`PageController`类的构造函数中将模板文件与模型传入视图的实例化中进行渲染
```bash
let param = {};
param.template = tpl;              //将模板文件存入新建对象param的template属性当中
param.model = result;              //将获取的page的模型存入新建对象param的model属性当中
let pageView= new PageView(param); //将page相对应的PageView类进行实例化，并传入param进行渲染
```
完整的index.js文件
```bash
//index.js
import $ from jquery';                             //jquey作为主要工具库，很多地方都有可能需要引入
import { PageModel } from '../model/pageModel';    //引入相应的model
import { PageView } from '../view/pageView';       //引入相应的view
require('./page.scss');                            //引入相应的page.scss
var tpl = require('./page.html');                  //引入相应的page.html，做模板渲染的基础文件
class PageController {
    constructor() {
        this.shut();
        let param = {};
        let result = new PageModel().toString();
        param.template = tpl;
        param.model = result;
        let pageView= new PageView(param);
    }
    shut() {
        $('view').hide();
    }
};
export { PageController };
```

`PageModel`用来获取page的模型数据，`PageView`用来生成html页面(需要数据才能生成动态页面)，页面主逻辑`index.js`的`PageController`则作为桥梁，负责将`PageModel`拿到的数据传入`PageView`进行渲染，生成最终的动态网页

### 2.配置路由
打开src/app.js文件
```bash
cd src/
vi app.js
```
引入jquery模块与director模块 
> 项目的主要逻辑依赖[jquery](https://github.com/jquery/jquery)，路由管理依赖[director](https://github.com/flatiron/director)

```bash
import $ from 'jquery';
import D from 'director/build/director';
```
拿到director的Router方法
> director的引入需要引入到`director/build/director`，这是因为director的UMD规范没有完善而造成，在此不做详细解读

```bash
var Router = D.Router;
```
配置路由并使用jquery的dom加载方法进行入口的初始化，在各个路由项目中将所对应的`[PageName]Controller`类进行实例化
```bash
$(function() {
    Router({
        '/': () => {        
        	/* doing */
        },
        '/page': () => {
            let pageController = new PageController ();
        },
        '/list': () => {
        	/* doing */
        }
    }).init('/');
});
```
## About
 - Quick是一个轻量级的业务层次的MVC单页面应用框架，由于不借助任何MV**框架，使得打包后的体积很小
 - Quick非常适合对各类主流框架短时间内不熟悉或者刚从requirejs过渡的童鞋，可以使用灵活的js代码
## Expand
Quick项目是本人借鉴之前公司的架构师所搭建的业务框架(AMD规范)，将原来的AMD模块改进成了es6模块。后续还要加入对异步处理的集体规范，希望可以加入更多比较时髦的技术来完善。欢迎各路大神来pull request或issues。
## Thanks to
@[yaoazhen](https://github.com/yaoazhen)