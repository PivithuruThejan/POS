import React from "react";
import { navigate, Redirect } from "@reach/router";

class Order extends React.Component {
  logout(event) {
    localStorage.clear();
    navigate("/");
  }
  render() {
    let buttonSize = { height: "50px", width: "200px", marginRight: "20px" };
    let roundButton = {
      border: "none",
      color: "white",
      padding: "20px",
      display: "inline-block",
      fontSize: "16px",
      margin: "4px 2px",
      borderRadius: "50%",
      marginLeft: "80%"
    };
    let cardStyle = { width: "18rem" };
    if (!localStorage.token) {
      return <Redirect to="/" noThrow />;
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="navbar-brand" href="/orders">
                    <h1>Home</h1>
                  </a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <button
                  className="btn btn-info"
                  type="button"
                  style={buttonSize}
                  onClick={this.logout.bind(this)}
                >
                  <h3>Logout</h3>
                </button>
              </form>
            </div>
          </nav>
          <button type="button" className="btn btn-danger" style={roundButton}>
            <h3>Add</h3>
          </button>
        </div>
      );
    }
  }
}

export default Order;
