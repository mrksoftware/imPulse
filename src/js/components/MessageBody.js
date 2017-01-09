import React from "react";

import * as MessageBodyActions from "../actions/MessageBodyActions";
import MessageBodyStore from "../stores/MessageBodyStore";


export default class MessageBody extends React.Component {
    constructor() {
        super();
        this.state = {
        	url: null,
            messageId: null,
            messageBody: null
        }
    }

    downloadMessageBodyAsync(messageId) {
    	console.log("Fired action: downloadMessageBodyAsync", messageId);
    	MessageBodyActions.downloadMessageBodyAsync(messageId);
    }

    componentDidMount() {
    	console.log("ComponentDidMount", this.props);
    	this.setState({messageId: this.props.messageId});
    	this.setState({url: this.props.url});
    	downloadMessageBodyAsync(this.props.messageId);
    }

    componentWillMount() {
	    MessageBodyStore.on("messageBodyDidDownload", () => {
	        console.log("messageBodyDidDownload catched")
	        this.setState({
	            messageBody: MessageBodyStore.getMessageBody(),
	            messageId: MessageBodyStore.getMessageId()
	        });
	    });
	}

    render() {
        return(
        	<div>
        		<span key={this.state.messageId}>{this.state.messageBody}</span>
        	</div>
        );
    }
}
