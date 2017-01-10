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
    	//console.log("Fired action: downloadMessageBodyAsync", messageId);
    	MessageBodyActions.downloadMessageBodyAsync(url, messageId);
    }

    componentDidMount() {
    	//console.log("ComponentDidMount", this.props);
    	this.setState({
			messageId: this.props.messageId,
			url: this.props.url,
			errorType: this.props.errorType,
			exceptionMessage: this.props.exceptionMessage
		});
		//console.log("Firing action: downloadMessageBodyAsync", this.props.messageId);
    	this.downloadMessageBodyAsync(this.props.url, this.props.messageId);
    }

    componentWillMount() {
	    MessageBodyStore.on("messageBodyDidDownload", () => {
	        //console.log("messageBodyDidDownload catched")
			if(this.state.messageId === MessageBodyStore.getMessageId()){
				this.setState({
					messageBody: MessageBodyStore.getMessageBody(),
					messageId: MessageBodyStore.getMessageId()
				});
			}
	    });

		MessageBodyStore.on("filterValueUpdated", () => {
	        //console.log("filterErrorList catched")
	    });

		MessageBodyStore.on("applyFilterValue", () => {
	        //console.log("filterValueUpdated catched", MessageBodyStore.getFilterValue())
	        this.setState({
				filterValue: MessageBodyStore.getFilterValue()
			});
	    });
	}

	getFormattedMessage(messageBody, filterValue) {
		var result = "";
		result = result + this.state.errorType + "|"; //Add errorType
		result = result + this.state.exceptionMessage + "|"; //add exceptionMessage
		if(filterValue) {
			//console.log("Apply filter: ", filterValue);
			filterValue.map(function(filter){
				if(messageBody.hasOwnProperty(filter))
					result = result + messageBody[filter] + "|"; //add idOrdineProduzione
			});
		}
		result = result + JSON.stringify(messageBody); //add messageBody
		//console.log("If result: ", filterValue, filterValue.lenght, filterValue.lenght > 0);
		
		return result;
	}

    render() {
		//console.log("rendering: ", this.state.messageBody, this.state.filterValue);
		var result = this.getFormattedMessage(this.state.messageBody.data, this.state.filterValue);
        return(
        	<div>
				<span key={this.state.messageId}>{result}</span>
        	</div>
        );
    }
}
