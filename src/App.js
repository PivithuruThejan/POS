import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Orders from "./Orders";
import Order from "./Order";
class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <Register path="/register" />
          <Orders path="/orders" />
          <Order path="/order" />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
