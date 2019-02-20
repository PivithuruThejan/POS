import React from "react";
import { navigate, Redirect } from "@reach/router";
import axios from "axios";
import Details from "./Details";

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      error: false
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  logout(event) {
    localStorage.clear();
    navigate("/");
  }

  fetchOrders() {
    let self = this;
    axios({
      method: "get",
      url: "http://localhost:8080/api/orders",
      headers: { Authorization: localStorage.token }
    })
      .then(function(response) {
        let orderResponse = response.data;
        self.setState({ orders: orderResponse });
      })
      .catch(function(err) {
        self.setState({ error: true });
      });
  }
  newOrder() {
    let status = "open";
    let itemList = [];
    axios({
      method: "post",
      url: "http://localhost:8080/api/order",
      headers: { Authorization: localStorage.token },
      data: { status: status, itemList: itemList }
    })
      .then(function(response) {
        let order_id = response.data;
        navigate("/orderEdit/" + order_id);
        console.log(order_id);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  render() {
    let buttonSize = { height: "50px", width: "200px", marginRight: "20px" };

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
                    type="button"
                    className="btn btn-info"
                    style={buttonSize}
                    onClick={this.logout.bind(this)}
                  >
                    Logout
                  </button>
                </form>
              </div>
            </nav>
            <button
              type="button"
              className="btn btn-info"
              style={roundButton}
              onClick={this.newOrder.bind(this)}
            >
              <h3>Add</h3>
            </button>
          </div>

          <div>
            {this.state.orders.map(order => {
              return <Details key={order} id={order} />;
            })}
          </div>
        </div>
      );
    }
  }
}
export default Orders;
