import React from "react";

import MessageList from "../components/MessageList";

import PulseAddressBar from "../components/PulseAddressBar";
import PulseStore from "../stores/PulseStore";

export default class ErrorMessagesView extends React.Component {
  constructor() {
    super();
    this.state = {
      groupId: null
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    const {group_id} = this.props.location.query;
    this.setState({
      groupId: group_id
    });
  }

  render() {
    return (
      <div>
        <MessageList groupId={this.state.groupId}></MessageList>
      </div>
    );
  }
}
