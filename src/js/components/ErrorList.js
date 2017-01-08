import React from "react";

import * as PulseActions from "../actions/PulseActions";
import PulseStore from "../stores/PulseStore";


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
        console.log("detailButtonCLick: ", this.state.address, event.target.attributes[1].value);
        PulseActions.downloadErrorList(this.state.address, event.target.attributes[1].value);
    }

    printButtonClick(event) {
        console.log("printButtonClick", this.responseType);
    }

    componentWillMount() {
        PulseStore.on("pulseAddressUpdated", () => {
            console.log("pulseAddressUpdated catched")
            this.setState({
                address: PulseStore.getPulseAddress().url
            });
        });

        PulseStore.on("fetchingErrorList", () => {
            console.log("fetchingErrorList catched")
        });

        PulseStore.on("errorListDownloaded", () => {
            console.log("errorListDownloaded catched")
            this.setState({
                address: PulseStore.getPulseAddress().url,
                errorList: PulseStore.getErrorList(),
                responseType: PulseStore.getRepsonseType(),
                selectedGroupId: PulseStore.getSelectedGroupId()
            });
        })
    }

    componentDidMount() {
        this.setState({address: PulseStore.getPulseAddress().url});
    }


    render() {
        console.log("render with state: ", this.state)
        var errorList = [];
        if(this.state.errorList!=undefined){
            console.log("loading from state", this.state.errorList);
            if(this.state.errorList.hasOwnProperty('data')){
                if(this.state.responseType === "groupList") {
                    errorList = this.state.errorList.data.map((errorItem, i) =>
                        <div key={errorItem.id}>
                            <h4 id="title">{errorItem.title}</h4>
                            <button class="btn btn-success" id={errorItem.id} onClick={this.detailButtonClick.bind(this)}>Details</button>
                        </div>
                    );
                } else if (this.state.responseType === "messageList") {
                    errorList = this.state.errorList.data.map((errorItem, i) =>
                        <div key={errorItem.message_id}>
                            <h4 id="title">{errorItem.message_type}</h4>
                            <span id="description">{errorItem.exception.message}</span>
                        </div>
                    );
                    errorList.unshift(<button onClick={this.printButtonClick.bind(this)} class="btn btn-danger">Print this group</button>);
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
