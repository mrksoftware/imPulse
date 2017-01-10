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
        console.log("Render TemplateBar", this.state);
        var filterList = [];
        this.state.filterValue.map(function(filter){
            filterList.push(<h4 class="horizontalStackPanel">{filter}</h4>);
        });
        console.log("FilterList", filterList);
        return (
            <div key="legendBar">
                <h4 class="horizontalStackPanel">HandlerName</h4>
                <h4 class="horizontalStackPanel">ExceptionMessage</h4>
                {filterList}
                <h4 class="horizontalStackPanel">MessageBody</h4>
            </div>
        );
    }
}