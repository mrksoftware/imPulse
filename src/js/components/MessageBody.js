import React from "react";

import * as MessageBodyActions from "../actions/MessageBodyActions";
import MessageBodyStore from "../stores/MessageBodyStore";


export default class MessageBody extends React.Component {
    constructor() {
        super();
        this.state = {
        	url: null,
            messageId: -1,
            messageBody: "..."
        }
    }

    downloadMessageBodyAsync(url, messageId) {
    	console.log("Fired action: downloadMessageBodyAsync", messageId);
    	MessageBodyActions.downloadMessageBodyAsync(url, messageId);
    }

    componentDidMount() {
    	console.log("ComponentDidMount", this.props);
    	this.setState({messageId: this.props.messageId});
    	this.setState({url: this.props.url});
		console.log("Firing action: downloadMessageBodyAsync", this.props.messageId);
    	this.downloadMessageBodyAsync(this.props.url, this.props.messageId);
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
