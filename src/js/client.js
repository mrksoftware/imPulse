import React from "react";
import ReactDOM from "react-dom";

import ErrorMessagesView from "./pages/ErrorMessagesView";
import Home from "./pages/Home";
import Shell from "./pages/Shell";

import { Router, Route, IndexRoute, browserHistory } from "react-router";

const app = document.getElementById("app");
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Shell}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="errorlist" component={ErrorMessagesView}></Route>
        </Route>
    </Router>,
app);
