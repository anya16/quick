

[![Build Status](https://travis-ci.org/Ironsub/quick.svg?branch=master)](https://travis-ci.org/Ironsub/quick)
![node](https://img.shields.io/badge/node->=7.0.0-brightgreen.svg)
[![GitHub issues](https://img.shields.io/github/issues/Leotw/quick.svg)](https://github.com/Leotw/quick/issues)
[![GitHub forks](https://img.shields.io/github/forks/Leotw/quick.svg)](https://github.com/Leotw/quick/network)
# Quick
HTML5 scaffold for web,no react,no angular,no vue.

## 起步

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

## 特点
- just use Js and Jquery achieved MVC without Angular,React or Vue
- support ES6 and other version ECMAScript.
- make a SPA with underscore and director.
- building with webpack and service with express.

## 目录
+ build ------ 存放npm指令配置文件
+ config ------ 存放webpack配置文件
+ public ------ 存放静态资源
+ node_modules ------ 依赖包
+ server.js ------ 构建入口
+ index.html ------ 入口文件
+ src/ ------ 业务逻辑
   * page/ ------ 单个页面
      * index,js ------ 控制器  
      * page.scss ------ 样式文件
      * page.html ------ 模板文件
   * model/ ------ 模型文件 
      * baseModel.js ------ 模型基类
      * pageModel.js ------ 模型子类
   * view/ ------ 视图目录
      * baseView.js ------ 视图基类
      * pageView.js ------ 视图子类
   * app.js ------ 路由控制
   * main.scss ------ 样式入口

## 使用
### 1.页面开发
#### 建立模型 
```bash
cd src/model
vi pageModel.js
```
所有的业务模型均继承自基类`BaseModel`，并根据后端返回的数据结构在`PageModel`类自定义方法
```bash
import { BaseModel } from 'BaseModel';
class pageModel extends BaseModel {
    constructor(param) {
        super(param);
    }
}
export { pageModel };
```
#### 建立视图
```bash
cd src/view
vi pageView.js
```
所有的业务视图均继承自基类`BaseView`,并根据相应控制器传入的参数执行渲染方法
```bash
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
#### 建立业务逻辑
```bash
cd src
mkdir page
vi index.js page.scss page.html
```
##### 控制器 indexjs
引入相应的`PageModel`类与`PageView`类以及jquery
> jquery是项目主要依赖的工具库，所以很多地方都需要引入
```bash
import { PageModel } from '../model/pageModel';
import { PageView } from '../view/pageView';
import $ from 'jquery';
```
引入相应的page.scss
```bash
require('./detail.scss');
```
引入相应的page.html，做模板渲染的基础文件
```bash
var tpl = require('./detail.html');
```
具体控制器`PageController`类的实现，将`PageModel`实例化后的输出结果在`PageView`的实例化中执行，进而渲染页面
```bash
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
控制器index.js主要代码概览
```bash
import { PageModel } from '../model/pageModel';
import { PageView } from '../view/pageView';
import $ from 'jquery';
require('./detail.scss');
var tpl = require('./detail.html');
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
##### 模板文件 page.html
> page.html并不是真正的html文件，而是[undescore](http://underscorejs.org/)的模板引擎所需要的基础文件，代码里含有`<%%>`等标记符可以进行一定的迭代运算
```bash
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
## 关于
Quick是一个轻量级的业务层次的MVC单页面应用框架，遵循ES6的模块规范(在浏览器端实质还是会解析成UMD规范)，不借助任何MV** 框架，使得打包后的体积很小。Quick非常适合对各类主流框架短时间内不熟悉或者刚从requirejs过渡的童鞋，可以使用灵活的js代码，不拘束于任何MV**框架语法限制。
## 拓展
Quick项目是本人借鉴之前公司的架构师所搭建的AMD规范的业务框架，并结合自己的经验、理解所搭建而成。目前只实现了静态部分的开发，后续还要加入对异步处理的集体规范，希望可以加入更多比较时髦的技术来完善。欢迎各路大神来pull request或issues。
## Thanks to
@[yaoazhen](https://github.com/yaoazhen)