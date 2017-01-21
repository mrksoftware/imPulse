import React from "react";

//components
import ErrorList from "../components/ErrorList";
import PulseAddressBar from "../components/PulseAddressBar";

//stores
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
    const { query } = this.props.location;
    
    return (
      <div>
        <PulseAddressBar pulseAddressValue={pulseAddressValue} groupby={query.groupby}/>
        <ErrorList />
      </div>
    );
  }
}
