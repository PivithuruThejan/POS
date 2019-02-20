import React from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { navigate } from "@reach/router";

class OrderEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_id: this.props,
      itemdata: [],
      error: false,
      itemName: "",
      price: "",
      count: ""
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  logout(event) {
    localStorage.clear();
    navigate("/");
  }
  deleteItem(event, order_id) {
    const current_order_id = order_id.id;
    const deleted_item_id = event;
    axios({
      method: "get",
      url: "http://localhost:8080/api/orderDetails/" + current_order_id,
      headers: { Authorization: localStorage.token }
    })
      .then(function(response) {
        let orderStatus = response.data.status;
        let itemList = response.data.itemList[0];
        if (!Array.isArray(itemList)) {
          itemList = itemList.slice(1, -1);
          itemList = itemList.split(",");
        }
        itemList = itemList.filter(
          item => !deleted_item_id.includes(item.trim())
        );
        let temp = "[";
        for (let i = 0; i < itemList.length - 1; i++) {
          temp = temp + itemList[i] + ",";
        }
        temp = temp + itemList[itemList.length - 1] + "]";
        axios({
          method: "put",
          url: "http://localhost:8080/api/order",
          headers: { Authorization: localStorage.token },
          data: {
            order_id: current_order_id,
            status: status,
            itemList: temp
          }
        })
          .then(function(response) {
            window.location.reload();
          })
          .catch(function(err) {
            console.log(err);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  fetchData() {
    const { id } = this.props;
    const self = this;
    axios({
      method: "get",
      url: "http://localhost:8080/api/order/" + id,
      headers: { Authorization: localStorage.token }
    })
      .then(function(response) {
        self.setState({ itemdata: response.data });
      })
      .catch(function(err) {
        self.setState({ error: true });
      });
  }
  setName(event) {
    this.setState({ itemName: event.target.value });
  }
  setPrice(event) {
    this.setState({ price: event.target.value });
  }
  setCount(event) {
    this.setState({ count: event.target.value });
  }

  createItem() {
    let order_id = this.state.order_id.id;
    let name = this.state.itemName;
    let price = this.state.price;
    let count = this.state.count;
    if (name == "" || price == 0 || count == 0) {
      alert("Invalid Item Details!");
    } else {
      axios({
        method: "post",
        url: "http://localhost:8080/api/item",
        headers: { Authorization: localStorage.token },
        data: { name: name, price: price, count: count }
      })
        .then(function(response) {
          let item_id = response.data.id;
          axios({
            method: "get",
            url: "http://localhost:8080/api/orderDetails/" + order_id,
            headers: { Authorization: localStorage.token }
          })
            .then(function(response) {
              let orderStatus = response.data.status;
              let itemList = response.data.itemList[0];
              let temp;

              if (!Array.isArray(itemList) && itemList != null) {
                itemList = itemList.slice(1, -1);
                itemList = itemList.split(",");
                temp = "[" + item_id + ",";
                for (let i = 0; i < itemList.length - 1; i++) {
                  temp = temp + itemList[i] + ",";
                }
                temp = temp + itemList[itemList.length - 1] + "]";
              } else {
                temp = "[" + item_id + "]";
              }

              console.log(temp);
              axios({
                method: "put",
                url: "http://localhost:8080/api/order",
                headers: { Authorization: localStorage.token },
                data: {
                  order_id: order_id,
                  status: orderStatus,
                  itemList: temp
                }
              })
                .then(function(response) {
                  window.location.reload();
                })
                .catch(function(err) {
                  console.log(err);
                });
            })
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    this.setState({ itemName: event.target.value });
    this.setState({ price: event.target.value });
    this.setState({ count: event.target.value });
    // console.log(price);
    // console.log(name);
    // console.log(count);
  }

  render() {
    let self = this;
    let center = {
      position: "relative",
      left: "45%",
      marginLeft: "-100px"
    };
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
    let inputFieldSize = { width: "200px" };
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
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="navbar-brand" href="/orders">
                    <h1>Home</h1>
                  </a>
                </li>
              </ul>
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
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Item Name</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Units</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {this.state.itemdata.map(item => {
                return (
                  <tr>
                    <th scope="row">{item.name}</th>
                    <td>{item.price}</td>
                    <td>{item.count}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={this.deleteItem.bind(
                          this,
                          item._id,
                          this.state.order_id
                        )}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th scope="row">
                  <input
                    style={inputFieldSize}
                    onChange={this.setName.bind(this)}
                  />
                </th>
                <td>
                  <input
                    style={inputFieldSize}
                    type="number"
                    min="0"
                    onChange={this.setPrice.bind(this)}
                  />
                </td>
                <td>
                  <input
                    style={inputFieldSize}
                    type="number"
                    min="0"
                    onChange={this.setCount.bind(this)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.createItem.bind(this)}
                  >
                    <FaRegCheckCircle />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}
export default OrderEdit;
