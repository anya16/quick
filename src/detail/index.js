require('./detail.scss');
import { BaseModel } from '../model/baseModel';
var detailModel = {
    name: 'Detail',
    des: 'Model of Detail',
    date: '2017/02/19'
};
var controllerDetail = function() {
    let baseModel = new BaseModel(detailModel);
    let result = baseModel.toString();
    console.log(result);
};
export { controllerDetail };
