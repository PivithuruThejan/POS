import React from "react";
import { navigate, Redirect } from "@reach/router";

class Orders extends React.Component {
  logout(event) {
    localStorage.clear();
    navigate("/");
  }
  render() {
    let buttonSize = { height: "50px", width: "200px", marginRight: "20px" };
    let shift = {
      marginLeft: "80%"
    };
    let paddingTop = { paddingTop: "20px" };
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
    if (!localStorage.token) {
      return <Redirect to="/" noThrow />;
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" />
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
              <ul className="navbar-nav mr-auto" />
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
          <div>
            <div id="accordion">
              <div className="card" style={paddingTop}>
                <div className="card-header" id="headingOne">
                  <div className="row">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <h4>Order 1</h4>
                      </button>
                    </h5>
                    <div className="float-right" style={shift}>
                      <a href="/order">
                        <button
                          className="btn btn-secondary "
                          type="button"
                          style={buttonSize}
                        >
                          <h4>View</h4>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">"Details!"</div>
                </div>
              </div>

              <div className="card" style={paddingTop}>
                <div className="card-header" id="headingTwo">
                  <div className="row">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        <h4>Order 2</h4>
                      </button>
                    </h5>
                    <div className="float-right" style={shift}>
                      <button
                        className="btn btn-secondary "
                        type="button"
                        style={buttonSize}
                      >
                        <h4>View</h4>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">"Details!"</div>
                </div>
              </div>

              <div className="card" style={paddingTop}>
                <div className="card-header" id="headingThree">
                  <div className="row">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        <h4>Order 3</h4>
                      </button>
                    </h5>
                    <div className="float-right" style={shift}>
                      <button
                        className="btn btn-secondary "
                        type="button"
                        style={buttonSize}
                      >
                        <h4>View</h4>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  id="collapseThree"
                  className="collapse show"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="card-body">"Details!"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default Orders;
