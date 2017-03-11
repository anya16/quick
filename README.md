

[![Build Status](https://travis-ci.org/Ironsub/quick.svg?branch=master)](https://travis-ci.org/Ironsub/quick)
![node](https://img.shields.io/badge/node-%3E%3D7.0.0-brightgreen.svg)
[![GitHub issues](https://img.shields.io/github/issues/Leotw/quick.svg)](https://github.com/Leotw/quick/issues)
[![GitHub forks](https://img.shields.io/github/forks/Leotw/quick.svg)](https://github.com/Leotw/quick/network)
# Quick
> HTML5 scaffold for web,no react,no angular,no vue.

## Getting started

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

## Usage
### Just a flexible development for webapp
- just use Js and Jquery achieved MVC without Angular,React or Vue.
- support ES6 and other version ECMAScript.
- make a SPA with underscore and director.
- building with webpack and service with express.

## structure
```shell
    ├── dist/           # 打包编译后的目录
    ├── build          # 获取linux指令
    ├── config        # webpack配置
    ├── public
    └── src
        ├── page/
            ├── index.js
            ├── page.html
            └── page.scss
        └── model/
            ├── baseModel.js
            └── pageModel.js
        └── view/                            
            ├── baseView.js
            └── pageView.js
        └── app.js
        └── main.scss
     └── index.html     #入口页面
```


