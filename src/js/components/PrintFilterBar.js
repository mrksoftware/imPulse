import React from "react";

import * as MessageBodyActions from "../actions/MessageBodyActions";
import MessageBodyStore from "../stores/MessageBodyStore";


export default class PrintFilterBar extends React.Component {
    constructor() {
        super();
        this.state = {
            filterValue: ""
        }
    }

    componentDidMount(){
        const {filterValue} = this.props;
        this.setState({filterValue:filterValue});
    }

    changeFilterValue(event){
        MessageBodyActions.updateFilterValue(event.target.value);
    }

    filterErrorList(event){
        this.setState({filterValue: MessageBodyStore.getFilterValue()});
        MessageBodyActions.applyFilterValue();
    }

    render() {
        return (
            <div>
                <div class="input-group">
                    <input type="text" class="form-control" id="address" onChange={this.changeFilterValue.bind(this)} />
                    <span class="input-group-btn">
                        <button id="btnSubmit" class="btn btn-info" type="button" onClick={this.filterErrorList.bind(this)}>Filter</button>
                    </span>
                </div>
            </div>
        );
    }
}
