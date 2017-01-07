import React from "react";

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
  }

  onButtonClick(event){
    console.log(event);
  }

  render() {
    return (
      <div>
        <label for="usr">Address</label>
        <div class="input-group">
            <input type="text" class="form-control" id="address" value={this.state.address} onChange={this.changeAddress.bind(this)} />
            <span class="input-group-btn">
              <button id="btnSubmit" class="btn btn-primary" type="button" onClick={this.onButtonClick.bind(this)}>Go!</button>
            </span>
        </div>
      </div>
    );
  }
}
