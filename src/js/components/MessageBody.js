import React from "react";

import * as MessageBodyActions from "../actions/MessageBodyActions";
import MessageBodyStore from "../stores/MessageBodyStore";


export default class MessageBody extends React.Component {
    constructor() {
        super();
        this.state = {
        	url: null,
            messageId: -1,
            messageBody: {data: "..."},
			errorType: "",
			exceptionMessage: ""
        }
    }

    downloadMessageBodyAsync(url, messageId) {
    	console.log("Fired action: downloadMessageBodyAsync", messageId);
    	MessageBodyActions.downloadMessageBodyAsync(url, messageId);
    }

    componentDidMount() {
    	console.log("ComponentDidMount", this.props);
    	this.setState({
			messageId: this.props.messageId,
			url: this.props.url,
			errorType: this.props.errorType,
			exceptionMessage: this.exceptionMessage
		});
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

	getFormattedMessage(messageBody) {
		var result = "";
		result = result + this.state.errorType + "|"; //Add errorType
		result = result + this.state.exceptionMessage + "|"; //add exceptionMessage
		result = result + JSON.stringify(messageBody) + "|"; //add messageBody
		if(messageBody.hasOwnProperty("idOrdineProduzione"))
			result = result + messageBody.idOrdineProduzione + "|"; //add idOrdineProduzione
		if(messageBody.hasOwnProperty("cv"))
			result = result + messageBody.cv + "|"; //add cv
		
		return result;
	}

    render() {
		console.log("rendering: ", this.state.messageBody);
		var result = this.getFormattedMessage(this.state.messageBody.data);
        return(
        	<div>
				<span key={this.state.messageId}>{result}</span>
        	</div>
        );
    }
}
