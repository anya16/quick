require('./detail.scss');
import { BaseModel } from '../model/baseModel';
import { BaseView } from '../view/baseView';
var detailModel = {
    name: 'Detail',
    des: 'Model of Detail',
    date: '2017/02/19'
};

class controllerDetail {
    constructor() {
        let baseModel = new BaseModel(detailModel);
        let result = baseModel.toString();
        console.log(result);
    }

}

export { controllerDetail };
