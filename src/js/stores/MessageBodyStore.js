import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class MessageBodyStore extends EventEmitter {
	
	constructor(){
		super();
		this.messageId = -1;
		this.messageBody = "Loading";
	}

	getMessageId() {
		return this.messageId;
	}

	getMessageBody() {
		return this.messageBody;
	}

	handleActions(action) {
    	console.log(action);

    	switch(action.type) {
            case "DOWNLOAD_MESSAGE_BODY_ASYNC": {
                this.messageId = action.messageId;
                this.messageBody = action.messageBody;
                this.emit("messageBodyDidDownload");
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