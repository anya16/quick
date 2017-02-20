import { ControllerDetail } from './detail';
import $ from 'jquery';
import D from 'director/build/director';
var Router = D.Router;
$(function() {
    Router({
        '/': () => {
        	$('.view').hide();
            console.log('index');
        },
        '/detail': () => {
        	$('.view').hide();
            let controllerDetail = new ControllerDetail();
        },
        '/list': () => {
        	$('.view').hide();
            console.log('list');
        }
    }).init('/');
});
