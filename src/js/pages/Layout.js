import React from "react";

import PulseAddressBar from "../components/PulseAddressBar";

import LayoutStore from "../stores/LayoutStore";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      pulseAddressValue: LayoutStore.getPulseAddress()
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
