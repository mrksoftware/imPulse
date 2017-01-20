import React from "react";

import { Link } from "react-router";

export default class Shell extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="#">imPulse</Link>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><Link to="errorlist">Error Groups<span className="sr-only">(current)</span></Link></li>
                        <li><Link to="messageslist">Group Messages</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
        {this.props.children}
      </div>
    );

    /*return (
      <div>
        <h1>Shell</h1>
        <Link to="errorlist">Error List</Link>
        {this.props.children}
      </div>
    );*/
  }
}
