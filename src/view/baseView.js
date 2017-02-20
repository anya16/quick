import _ from 'underscore';
import $ from 'jquery';
class BaseView {
    constructor(param) {
        this.$app = $('#app');
        this.$ele = $('<div id="detail" class="view">');
        this.model = param.model;
        this.template = param.template;
        this.filter();
        this.render();
    }
    render() {
        let tpl = this.template;
        let model = this.model;
        let html = _.template(tpl)(model);
        this.$ele.html(html);
        this.$app.append(this.$ele);
    }
    filter() {
        let _tpl = this.template;
        _tpl.indexOf('module.exports = ') == 0 ? _tpl = _tpl.replace('module.exports = ', '') : '';
        this.template = _tpl;
    }
}
export { BaseView };
