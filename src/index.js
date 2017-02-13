import $ from 'jquery';
import _ from 'underscore';
import  {list} from './list/list';
import {detail} from './detail/detail';

var _list = list();
var _detail = detail();
$(function () {
    $('#container').html(_list + _detail);
    console.log(222);
});