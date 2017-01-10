import React from "react";

import ErrorList from "../components/ErrorList";
import PrintFilterBar from "../components/PrintFilterBar"
import PulseAddressBar from "../components/PulseAddressBar";

import PulseStore from "../stores/PulseStore";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      pulseAddressValue: PulseStore.getPulseAddress()
    }
  }

  render() {
    const {pulseAddressValue} = this.state;

    return (
      <div>
        <PulseAddressBar pulseAddressValue={pulseAddressValue.url} />
        <PrintFilterBar filterValue="" />
        <ErrorList />
      </div>
    );
  }
}
