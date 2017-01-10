import React from "react";

import * as MessageBodyActions from "../actions/MessageBodyActions";
import MessageBodyStore from "../stores/MessageBodyStore";


export default class MessageBodyTemplateBar extends React.Component {

    constructor() {
        super();
        this.state = {
            FilterValue: []
        }
    }

    componentWillMount() {

		MessageBodyStore.on("applyFilterValue", () => {
	        //console.log("filterValueUpdated catched", MessageBodyStore.getFilterValue())
	        this.setState({
				filterValue: MessageBodyStore.getFilterValue()
			});
	    });
	}

    componentDidMount() {
        this.setState({
            filterValue: MessageBodyStore.getFilterValue()
        });
    }

    render() {
        var filterList = [];
        filterList = this.state.filterValue.map(function(filter){
            return <h4 class="horizontalStackPanel">{filter}</h4>;
        });
        return (
            <div>
                <h4 class="horizontalStackPanel">HandlerName</h4>
                <h4 class="horizontalStackPanel">ExceptionMessage</h4>
                {filterList}
                <h4 class="horizontalStackPanel">MessageBody</h4>
            </div>
        );
    }
}