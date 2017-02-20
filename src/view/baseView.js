class BaseView {
    constructor(model) {
    	this.model = model
    }
    render() {
    	console.log(this.model);
    }
}
export { BaseView };
