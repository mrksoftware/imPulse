import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PulseStore extends EventEmitter {
    constructor() {
        super()
        this.pulseAddressValue = {url: "http://localhost:33334"};
        this.errorList = null;
    }

    getPulseAddress() {
        return this.pulseAddressValue;
    }

    getErrorList() {
        return this.errorList;
    }

    handleActions(action) {
        console.log(action);
        switch(action.type) {
            case "UPDATE_PULSE_ADDRESS": {
                this.pulseAddressValue = {url: action.url};
                this.emit("pulseAddressUpdated");
            }
            case "FETCHING_ERROR_LIST": {
                this.pulseAddressValue = {url: action.url};
                this.emit("fetchingErrorList");                
            }
            case "DOWNLOADED_ERROR_LIST": {
                this.errorList = action.response;
                this.pulseAddressValue =  {url: action.status};
                this.emit("errorListDownloaded");
            }
        }
    }
}

const pulseStore = new PulseStore;
dispatcher.register(pulseStore.handleActions.bind(pulseStore));

//Expose pulseStore globally (for test purpose)
//window.pulseStore = PulseStore;

//Expose dispatcher globally (for test purpose)
//window.dispatcher = dispatcher;

export default pulseStore;