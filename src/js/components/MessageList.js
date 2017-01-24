import React from "react";
import CopyToClipboard from 'react-copy-to-clipboard';

import * as MessageListActions from "../actions/MessageListActions";
import MessageListStore from "../stores/MessageListStore";
import PulseStore from "../stores/PulseStore";

import { Link } from "react-router";

export default class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
    }

    componentWillReceiveProps(newProps) {
        //console.log("New", newProps, this.props);
        this.props = newProps;
        const { groupId } = this.props;
        this.loadMessagesWillStart(groupId);
    }

    loadMessagesWillStart(groupId) {
        if(groupId) {
            const url = PulseStore.getPulseAddress();
            //console.log(url ,groupId);
            MessageListActions.downloadMessageListAsync(url ,groupId);
        }
    }

    componentWillMount() {
        //console.log("Will", this.props);
        MessageListStore.on("messageListDidDownload", () => {
            //console.log("fetchingErrorList catched", MessageListStore.getData());
            const { data } = MessageListStore.getData();
            this.setState({
                data: data
            });
        });

        MessageListStore.on("messageBodyDidDownload", () => {
	        //console.log("messageBodyDidDownload catched")
            var tempData = this.state.data;
			if(tempData){
                //console.log("Before", tempData);
                this.state.data.map(function(message){
                    if(message.message_id === MessageListStore.getMessageId()) {
                        //console.log("MessageBody", JSON.stringify(MessageListStore.getMessageBody().data));
                        message.messageBody = MessageListStore.getMessageBody().data;
                    }
                });
                //console.log("After", tempData);
                this.setState({
                    data: tempData
                })
            }
	    });

        /* Qui arriva il messageBody, andare ad aggiungerlo nello stato della pagina
        MessageBodyStore.on("messageBodyDidDownload", () => {
	        //console.log("messageBodyDidDownload catched")
			if(this.state.messageId === MessageBodyStore.getMessageId()){
				this.setState({
					messageBody: MessageBodyStore.getMessageBody(),
					messageId: MessageBodyStore.getMessageId()
				});
			}
	    });*/
    }

    componentDidMount() {
        //console.log("Did", this.props);
        
    }

    getMessageBody(message) {
        //console.log(message);
        if(message.hasOwnProperty("messageBody")){
            var res = JSON.stringify(message.messageBody);
            //console.log("ER", res);
            return res;
        } else {
            MessageListActions.downloadMessageBodyAsync(PulseStore.getPulseAddress(), message.message_id);
            return "......";
        }
    }

    getJsonAttributeSeparatedByTab(messageBody) {
        var result = "";
        //console.log(messageBody);
        for(var attr in messageBody) {
            result = result + "\t" + attr;
        }
        return result;
    }

    getJsonObjectSeparatedByTab(messageBody) {
        var result = "";
        //console.log(messageBody);
        for(var attr in messageBody) {
            result = result + "\t" + messageBody[attr];
        }
        return result;
    }

    getFormattedDataTable() {
        var context = this;
        var result = "";
        var tempData = this.state.data;
        if(tempData){
            tempData.map(function(message, i){
                if(message){
                    if(i==0){
                        result = "Message Type\tException Message" + context.getJsonAttributeSeparatedByTab(message.messageBody) + "\r";
                    }
                    result = result + message.message_type + "\t" + message.exception.message + context.getJsonObjectSeparatedByTab(message.messageBody) + "\r";
                }
            });
        }
        return result;
    }

    render() {
        //console.log("render with state: ", this.state)
        var context = this;
        var copyButton = "";
        var elements = [];
        const { data } = this.state;
        var showCopyButton = false;
        if(data){
            //console.log("Render", data);
            data.map(function(message,index){
                if(index==0){
                    elements.push(
                        <tbody key="titleBar">
                            <tr>
                                <th>Message Type</th>
                                <th>Exception Message</th>
                                <th>Message Body</th>
                            </tr>
                        </tbody>
                    )    
                }
                //console.log(context.getMessageBody(message));
                const formattedMessageBody = context.getMessageBody(message);
                elements.push(
                    <tbody key={message.message_id}>
                        <tr>
                            <td>{message.message_type}</td>
                            <td>{message.exception.message}</td>
                            <td>{formattedMessageBody}</td>
                        </tr>
                    </tbody>
                )
                showCopyButton = (formattedMessageBody && formattedMessageBody !== "......");
            });

            if(showCopyButton) {
                copyButton = (
                    <div class="transparentInnerDiv">
                        <h4>List</h4>
                        <CopyToClipboard text={this.getFormattedDataTable()} onCopy={() => this.setState({copied:true})}>
                            <button class="btn btn-success rightInFlex">{this.state.copied?"Copied!":"Copy to clipboard"}</button>
                        </CopyToClipboard>
                    </div>
                );
            }
        }
        //console.log("Ren", this.props);
        return (
            <div>
                <div class="errorList">
                    {copyButton}
                    <table>
                        {elements}
                    </table>
                </div>
            </div>
        );
    }
}
