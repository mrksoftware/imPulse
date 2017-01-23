import React from "react";

import * as PulseActions from "../actions/PulseActions";
import PulseStore from "../stores/PulseStore";
import Global from "../global";
import { browserHistory } from 'react-router'

export default class PulseAddressBar extends React.Component {
  constructor() {
    super();
    this.state = {
        address: ""
    }
  }

  componentWillMount() {
    PulseStore.on("groupByModified", () => {
        const groupBy  = MessageListStore.getGroupBy();
        downloadErrorGroupsList(groupBy);
    });
  }

  componentDidMount(){
    const {pulseAddressValue} = this.props;
    this.setState({address:pulseAddressValue});
  }

  changeAddress(event){
    this.setState({address: event.target.value});
    PulseActions.updatePulseAddress(event.target.value);
  }

  onBtnSubmitClick(event){
    var { groupby } = this.props;
    if(!groupby)
      groupby = "messagetype";
    this.downloadErrorGroupsList(groupby);
  }

  downloadErrorGroupsList(groupBy){
    console.log(groupBy);
    browserHistory.push(Global.root + "?groupby=" + groupBy);
    PulseActions.downloadErrorGroupsList(this.state.address, groupBy);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div class="input-group">
            <span class="input-group-addon">Address</span>
            <input type="text" class="form-control" id="address" value={this.state.address} onChange={this.changeAddress.bind(this)} />
            <span class="input-group-btn">
              <button id="btnSubmit" class="btn btn-primary" type="button" onClick={this.onBtnSubmitClick.bind(this)}>Search</button>
            </span>
        </div>
      </div>
    );
  }
}
