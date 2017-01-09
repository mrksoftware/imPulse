import React from "react";

import * as PulseActions from "../actions/PulseActions";
import PulseStore from "../stores/PulseStore";

export default class PulseAddressBar extends React.Component {
  constructor() {
    super();
    this.state = {
        address: ""
    }
  }

  componentDidMount(){
    const {pulseAddressValue} = this.props;
    this.setState({address:pulseAddressValue});
  }

  changeAddress(event){
    this.setState({address: event.target.value});
    PulseActions.updatePulseAddress(event.target.value);
  }

  downloadErrorGroupsList(event){
    PulseActions.downloadErrorGroupsList(this.state.address);
  }

  render() {
    return (
      <div>
        <label for="usr">Address</label>
        <div class="input-group">
            <input type="text" class="form-control" id="address" value={this.state.address} onChange={this.changeAddress.bind(this)} />
            <span class="input-group-btn">
              <button id="btnSubmit" class="btn btn-primary" type="button" onClick={this.downloadErrorGroupsList.bind(this)}>Search</button>
            </span>
        </div>
      </div>
    );
  }
}
