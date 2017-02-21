import _ from 'underscore';
import $ from 'jquery';
import { BaseView } from './baseView';
class DetailView extends BaseView {
    constructor(param) {
        super(param);
        this.id = '#detail';
        this.$ele = $('<div id="detail" class="view">');
        this.filter();
        this.render();
    }
}
export { DetailView };
