import React from "react";

import PulseAddressBar from "../components/PulseAddressBar";
import ErrorList from "../components/ErrorList";

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
        <ErrorList />
      </div>
    );
  }
}
