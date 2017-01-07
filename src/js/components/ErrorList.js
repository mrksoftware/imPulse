import React from "react";

import PulseStore from "../stores/PulseStore";


export default class ErrorList extends React.Component {
  constructor() {
    super();
    this.state = {
        address: "Test",
        errorList: [{}]
    }
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
            this.setState({
                address: PulseStore.getPulseAddress().url
            });
        });

        PulseStore.on("errorListDownloaded", () => {
            console.log("errorListDownloaded catched")
            this.setState({
                address: PulseStore.getPulseAddress().url,
                errorList: PulseStore.getErrorList()
            });
        })
    }


    render() {
        console.log(this.state)
        var errorList = [];
        if(this.state.errorList!=undefined){
            console.log("loading from state", this.state.errorList);
            if(this.state.errorList.hasOwnProperty('data')){
                errorList = this.state.errorList.data.map((errorItem, i) =>
                    <h4 key={i}>{errorItem.toString()}</h4>
                );
            }
        }

        return (
        <div>
            <label for="usr">{this.state.address}</label>
            <div>
                {errorList}
            </div>
        </div>
        );
    }
}
