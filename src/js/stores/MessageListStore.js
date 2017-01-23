import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class MessageListStore extends EventEmitter {
	
	constructor(){
		super();
		this.groupId = null;
		this.data = null;
		this.messageId = null;
		this.messageBody = null;
	}

	getgroupId() {
		return this.groupId;
	}

	getData(){
		return this.data;
	}

	getMessageId() {
		return this.messageId;
	}

	getMessageBody() {
		return this.messageBody;
	}

	handleActions(action) {
    	//console.log(action);

    	switch(action.type) {
            case "DOWNLOADED_MESSAGE_LIST": {
                this.data =  action.response;
                this.emit("messageListDidDownload");
            }
			case "DOWNLOAD_MESSAGE_BODY_ASYNC": {
                this.messageId = action.messageId;
                this.messageBody = action.messageBody;
                this.emit("messageBodyDidDownload");
            }
        }
	}

}

const messageListStore = new MessageListStore;
dispatcher.register(messageListStore.handleActions.bind(messageListStore));

//Expose pulseStore globally (for test purpose)
//window.pulseStore = PulseStore;

//Expose dispatcher globally (for test purpose)
//window.dispatcher = dispatcher;

export default messageListStore;