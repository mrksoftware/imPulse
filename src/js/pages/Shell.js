import React from "react";

import NavLink from "../components/NavLink";

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
                    <NavLink className="navbar-brand" to="#">imPulse</NavLink>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><NavLink to="/errorlist">Error Groups</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="containerCustom">
          {this.props.children}
        </div>
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
