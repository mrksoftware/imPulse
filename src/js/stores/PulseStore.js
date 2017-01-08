import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PulseStore extends EventEmitter {
    constructor() {
        super()
        this.pulseAddressValue = {url: "http://localhost:33334"};
        this.errorList = null;
        this.responseType = null;
        this.selectedGroupId = null;
    }

    getPulseAddress() {
        return this.pulseAddressValue;
    }

    getErrorList() {
        return this.errorList;
    }

    getRepsonseType() {
        return this.responseType;
    }

    getSelectedGroupId() {
        return this.selectedGroupId;
    }

    handleActions(action) {
        console.log(action);
        switch(action.type) {
            case "UPDATE_PULSE_ADDRESS": {
                this.pulseAddressValue = {url: action.url};
                this.emit("pulseAddressUpdated");
            }
            case "FETCHING_ERROR_LIST": {
                this.emit("fetchingErrorList");                
            }
            case "DOWNLOADED_ERROR_LIST": {
                console.log("AddresValue in PulseStore: ", this.pulseAddressValue);
                this.errorList = action.response;
                this.responseType = action.responseType;
                this.selectedGroupId = action.selectedGroupId;
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