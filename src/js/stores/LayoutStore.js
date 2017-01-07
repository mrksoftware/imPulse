import { EventEmitter } from "events";

class LayoutStore extends EventEmitter {
    constructor() {
        super()
        this.pulseAddressValue = {url: "http://localhost:3000"};
    }

    getPulseAddress() {
        return this.pulseAddressValue;
    }
}

const layoutStore = new LayoutStore;

export default layoutStore;