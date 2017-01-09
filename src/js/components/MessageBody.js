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
			exceptionMessage: "",
			filterValue: []
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
			exceptionMessage: this.props.exceptionMessage
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

		MessageBodyStore.on("filterValueUpdated", () => {
	        console.log("filterErrorList catched")
	    });

		MessageBodyStore.on("applyFilterValue", () => {
	        console.log("filterValueUpdated catched", MessageBodyStore.getFilterValue())
	        this.setState({
				filterValue: MessageBodyStore.getFilterValue()
			});
	    });
	}

	getFormattedMessage(messageBody) {
		var result = "";
		result = result + this.state.errorType + "|"; //Add errorType
		result = result + this.state.exceptionMessage + "|"; //add exceptionMessage
		result = result + JSON.stringify(messageBody) + "|"; //add messageBody
		if(this.state.filterValue && this.state.filterValue.lenght > 0){
			console.log("Apply filter: ", this.state.filterValue);
			this.state.filterValue.map(function(filter){
				if(messageBody.hasOwnProperty(filter))
					result = result + messageBody[filter] + "|"; //add idOrdineProduzione
			});
		}
		
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
