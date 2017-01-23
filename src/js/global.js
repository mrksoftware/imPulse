
class Global {
    constructor() {
        this.isDebug = false;
        this.root = this.isDebug ? "": "/impulse";
    }
}

export default (new Global);