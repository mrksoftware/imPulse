import React from "react";

import PulseAddressBar from "../components/PulseAddressBar";

import PulseStore from "../stores/PulseStore";

export default class Home extends React.Component {
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
      </div>
    );
  }
}
