import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class MessageListStore extends EventEmitter {
	
	constructor(){
		super();
		this.groupId = null;
		this.data = null;
	}

	getgroupId() {
		return this.groupId;
	}

	getData(){
		return this.data;
	}

	handleActions(action) {
    	//console.log(action);

    	switch(action.type) {
            case "DOWNLOADED_MESSAGE_LIST": {
                this.data =  action.response;
                this.emit("messageListDidDownload");
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