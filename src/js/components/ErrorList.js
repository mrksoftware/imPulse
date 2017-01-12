import React from "react";

import MessageBody from "./MessageBody"
import MessageBodyTemplateBar from "./MessageBodyTemplateBar"

import * as PulseActions from "../actions/PulseActions";
import PulseStore from "../stores/PulseStore";

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export default class ErrorList extends React.Component {
    constructor() {
        super();
        this.state = {
            address: null,
            errorList: null,
            responseType: null,
            selectedGroupId: null
        }
    }

    detailButtonClick(event) {
        //console.log("detailButtonCLick: ", this.state.address, event.target, event.target.attributes[1].value);
        PulseActions.downloadErrorList(this.state.address, event.target.id);
    }

    printButtonClick(event) {
        //console.log("printButtonClick", this.state.errorList);
        var messageIds = [];
        this.state.errorList.data.map(function(errorItem){
            messageIds.push(errorItem.message_id);
        });
        PulseActions.downloadMessageBodyList(this.state.address,messageIds);
    }

    componentWillMount() {
        PulseStore.on("pulseAddressUpdated", () => {
            //console.log("pulseAddressUpdated catched")
            this.setState({
                address: PulseStore.getPulseAddress().url
            });
        });

        PulseStore.on("fetchingErrorList", () => {
            //console.log("fetchingErrorList catched")
        });

        PulseStore.on("errorListDownloaded", () => {
            //console.log("errorListDownloaded catched")
            this.setState({
                address: PulseStore.getPulseAddress().url,
                errorList: PulseStore.getErrorList(),
                responseType: PulseStore.getRepsonseType(),
                selectedGroupId: PulseStore.getSelectedGroupId()
            });
        });

        PulseStore.on("messageBodyListDownloaded", () => {
            var errorList = PulseStore.getErrorList();
            if(errorList !== undefined) {
                //console.log("messageBodyListDownloaded catched")
                //console.log("Message Body list: ", PulseStore.getErrorList());

                var text = [];
                PulseStore.getErrorList().map(function(body){
                    text.push(body);
                });
                //console.log(text);

                this.setState({
                    address: PulseStore.getPulseAddress().url,
                    errorList: text,
                    responseType: "downloadLink"
                });
            }
        });
    }

    componentDidMount() {
        this.setState({address: PulseStore.getPulseAddress().url});
    }

    render() {
        //console.log("render with state: ", this.state)
        var errorList = [];
        if(this.state.errorList!=undefined){
            //console.log("loading from state", this.state.errorList);
            if(this.state.errorList.hasOwnProperty('data')){
                if(this.state.responseType === "groupList") {
                    errorList = this.state.errorList.data.map((errorItem, i) =>
                        <div class="input-group" key={errorItem.id}>
                            <span class="input-group-addon">{errorItem.count}</span>
                            <input id="title" type="text" class="form-control" value={errorItem.title} disabled></input>
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" id={errorItem.id} onClick={this.detailButtonClick.bind(this)}>Details</button>
                            </span>
                        </div>
                    );
                } else if (this.state.responseType === "messageList") {
                    /*errorList = this.state.errorList.data.map((errorItem, i) =>
                        <div key={errorItem.message_id}>
                            <MessageBody    errorType={errorItem.message_type} 
                                            exceptionMessage={errorItem.exception.message}
                                            messageId={errorItem.message_id} 
                                            url={this.state.address}
                                            key={errorItem.message_id} ></MessageBody>
                            <hr></hr>                            
                        </div>
                    );*/
                    var dataContext = this.state.errorList.data;
                    console.log(dataContext);
                    errorList.push( 
                        <BootstrapTable data={dataContext} striped={true} hover={true}>
                            <TableHeaderColumn dataField="message_type" isKey={true} dataAlign="center" dataSort={true}>Message Type</TableHeaderColumn>
                            <TableHeaderColumn dataField="status" dataSort={true}>Exception Message</TableHeaderColumn>
                        </BootstrapTable>
                    );
                    errorList.unshift(
                        <MessageBodyTemplateBar key="messageBodyTemplateBar" />
                    );
                } 
            }
        }

        return (
        <div>
            <label for="usr">{this.state.address}</label>
            <div>
                <div class="errorList">
                    {errorList}
                </div>
            </div>
        </div>
        );
    }
}
