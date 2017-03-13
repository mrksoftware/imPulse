import React from "react";

import * as MessageListActions from "../actions/MessageListActions";
import MessageListStore from "../stores/MessageListStore";
import PulseStore from "../stores/PulseStore";

import { Link } from "react-router";

export default class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    onBtnLoadMoreClick() {
        const url = PulseStore.getPulseAddress();
        //console.log(url ,groupId);
        const { groupId } = this.props;
        MessageListActions.downloadMessageListAsync(url ,groupId);
    }

    render() {
        return (
            <button id="btnLoadMore" class="btn btn-primary" type="button" onClick={this.onBtnLoadMoreClick.bind(this)}>Load More...</button>
        );
    }

}