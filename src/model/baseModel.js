class BaseModel {
    constructor(param) {
        this.model = {};
        this.init(param);
    }
    init(param) {
        this.model = param;
    }
    toString() {
        return this.model;
    }
}
export { BaseModel };
