
class Global {
    constructor() {
        this.isDebug = true;
        this.root = this.isDebug ? "": "/impulse";
    }
}

export default (new Global);