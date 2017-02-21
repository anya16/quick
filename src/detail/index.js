import { BaseModel } from '../model/baseModel';
import { DetailView } from '../view/DetailView';
import $ from 'jquery';
require('./detail.scss');
var tpl = require('./detail.html');
var detailModel = {
    body: [{
        name: 'Detail1',
        des: 'Model of Detail',
        date: '2017/02/01'
    }, {
        name: 'Detail2',
        des: 'Model of Detail',
        date: '2017/02/02'
    }, {
        name: 'Detail3',
        des: 'Model of Detail',
        date: '2017/02/02'
    }, {
        name: 'Detail4',
        des: 'Model of Detail',
        date: '2017/02/03'
    }]
};

class ControllerDetail {
    constructor() {
        this.shut();
        let param = {};
        let result = new BaseModel(detailModel).toString();
        param.template = tpl;
        param.model = result;
        let detailView = new DetailView(param);
    }
    shut() {
        $('view').hide();
    }
};

export { ControllerDetail };
