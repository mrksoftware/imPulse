import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class MessageBodyStore extends EventEmitter {
	
	constructor(){
		super();
		this.messageId = -1;
		this.messageBody = "Loading";
		this.filterValue = "";
	}

	getMessageId() {
		return this.messageId;
	}

	getMessageBody() {
		return this.messageBody;
	}

	getFilterValue(){
		if(this.filterValue && this.filterValue !== ""){
			var split = this.filterValue.split(",")
			var selected = [];
			for (var i = 0; i < split.length; i++) {
				selected.push(split[i]);
			}
			return selected;
		}
		else
			return ["IdSequenza"];
	}

	handleActions(action) {
    	console.log(action);

    	switch(action.type) {
            case "DOWNLOAD_MESSAGE_BODY_ASYNC": {
                this.messageId = action.messageId;
                this.messageBody = action.messageBody;
                this.emit("messageBodyDidDownload");
            }
			case "UPDATE_FILTER_VALUE": {
                this.filterValue = action.filterValue;
                this.emit("filterValueUpdated");
            }
			case "APPLY_FILTER_VALUE": {
                this.emit("applyFilterValue");
            }
        }
	}

}

const messageBodyStore = new MessageBodyStore;
dispatcher.register(messageBodyStore.handleActions.bind(messageBodyStore));

//Expose pulseStore globally (for test purpose)
//window.pulseStore = PulseStore;

//Expose dispatcher globally (for test purpose)
//window.dispatcher = dispatcher;

export default messageBodyStore;