import { controllerDetail } from './detail';
import $ from 'jquery';
import _ from 'undescore';
import D from 'director/build/director';
var Router = D.Router;
$(function() {
    let routes = {
        '/detail': controllerDetail,
        '/list': () => {
            console.log('list');
        }
    };
    let router = Router(routes);
    router.init();
});
