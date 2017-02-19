class BaseModel {
    constructor(param) {
    	this.model = {};
        this.init(param);
    }
    toString() {
        return this.model;
    }
    init(param) {
        this.model = param;
    }
}
export { BaseModel };