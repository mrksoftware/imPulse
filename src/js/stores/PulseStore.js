import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PulseStore extends EventEmitter {
    constructor() {
        super()
        this.pulseAddressValue = "http://localhost:33333";
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
        //console.log(action);
        switch(action.type) {
            case "UPDATE_PULSE_ADDRESS": {
                this.pulseAddressValue =  action.url;
                this.emit("pulseAddressUpdated");
            }
            case "FETCHING_ERROR_LIST": {
                this.emit("fetchingErrorList");                
            }
            case "DOWNLOADED_ERROR_LIST": {
                //console.log("AddresValue in PulseStore: ", this.pulseAddressValue);
                this.errorList = action.response;
                this.responseType = action.responseType;
                this.selectedGroupId = action.selectedGroupId;
                this.emit("errorListDownloaded");
            }
            case "DOWNLOADED_MESSAGE_BODY_LIST": {
                //console.log(this.action);
                this.errorList = action.response;
                this.responseType = action.responseType;
                this.emit("messageBodyListDownloaded");
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