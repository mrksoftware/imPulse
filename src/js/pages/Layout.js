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
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">imPulse</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Error Groups<span className="sr-only">(current)</span></a></li>
                        <li><a href="#">Group Messages</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <PulseAddressBar pulseAddressValue={pulseAddressValue.url} />
        <PrintFilterBar filterValue="" />
        <ErrorList />
      </div>
    );
  }
}
