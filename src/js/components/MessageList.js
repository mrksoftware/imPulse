import React from "react";

import * as MessageListActions from "../actions/MessageListActions";
import MessageListStore from "../stores/MessageListStore";
import PulseStore from "../stores/PulseStore";
import MessageBody from "./MessageBody";

import { Link } from "react-router";

export default class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(newProps) {
        console.log("New", newProps, this.props);
        this.props = newProps;
        const { groupId } = this.props;
        this.loadMessagesWillStart(groupId);
    }

    loadMessagesWillStart(groupId) {
        if(groupId) {
            const url = PulseStore.getPulseAddress();
            console.log(url ,groupId);
            MessageListActions.downloadMessageListAsync(url ,groupId);
        }
    }

    componentWillMount() {
        console.log("Will", this.props);
        MessageListStore.on("messageListDidDownload", () => {
            console.log("fetchingErrorList catched", MessageListStore.getData());
            const { data } = MessageListStore.getData();
            this.setState({
                data: data
            });
        });
    }

    componentDidMount() {
        console.log("Did", this.props);
        
    }

    render() {
        //console.log("render with state: ", this.state)
        var elements = [];
        const { data } = this.state;
        if(data){
            console.log("Render", data);
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
                elements.push(
                    <tbody key={message.message_id}>
                        <tr>
                            <td>{message.message_type}</td>
                            <td>{message.exception.message}</td>
                <td><MessageBody messageId={message.message_id} url={PulseStore.getPulseAddress()}></MessageBody></td>
                        </tr>
                    </tbody>
                )
            });
        }
        console.log("Ren", this.props);
        return (
            <div>
                <div class="errorList">
                    <table>
                        {elements}
                    </table>
                </div>
            </div>
        );
    }
}
