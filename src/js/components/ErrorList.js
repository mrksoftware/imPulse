import React from "react";

import MessageBody from "./MessageBody"

import * as PulseActions from "../actions/PulseActions";
import PulseStore from "../stores/PulseStore";

import { Link } from "react-router";

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

    componentWillMount() {
        PulseStore.on("pulseAddressUpdated", () => {
            //console.log("pulseAddressUpdated catched")
            this.setState({
                address: PulseStore.getPulseAddress()
            });
        });

        PulseStore.on("fetchingErrorList", () => {
            //console.log("fetchingErrorList catched")
        });

        PulseStore.on("errorListDownloaded", () => {
            //console.log("errorListDownloaded catched")
            this.setState({
                address: PulseStore.getPulseAddress(),
                errorList: PulseStore.getErrorList(),
                responseType: PulseStore.getRepsonseType(),
                selectedGroupId: PulseStore.getSelectedGroupId()
            });
        });
    }

    componentDidMount() {
        this.setState({
            address: PulseStore.getPulseAddress(),
            errorList: PulseStore.getErrorList(),
            responseType: PulseStore.getRepsonseType(),
            selectedGroupId: PulseStore.getSelectedGroupId()
        });
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
                                <Link to={"errorlist?group_id=" + errorItem.id}>
                                    <button class="btn btn-success" type="button" id={errorItem.id}>Details</button>
                                </Link>
                            </span>
                        </div>
                    );
                    errorList.unshift(
                        <div key="legendBar" class="errorListTitleBar">
                            <h4 class="horizontalStackPanel" key="handlerNameLegend">Count</h4>
                            <h4 class="horizontalStackPanel" key="exceptionMessageLegend">Title</h4>
                        <div class="rightInFlex">
                                <span>Group by </span>
                                <div class="btn-group">
                                    <button class="btn btn-info btn-small active">Exception Type</button>
                                    <button class="btn btn-info btn-small">Handler Name</button>
                                </div>    
                            </div>
                        </div>
                    );
                } 
            }
        }

        return (
        <div>
            <div class="errorList">
                {errorList}
            </div>
        </div>
        );
    }
}
