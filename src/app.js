import { ControllerDetail } from './detail';
import $ from 'jquery';
import D from 'director/build/director';
var Router = D.Router;
$(function() {
    Router({
        '/': () => {
            console.log('index');
        },
        '/detail': () => {
            let controllerDetail = new ControllerDetail();
        },
        '/list': () => {
            console.log('list');
        }
    }).init('/');
});
