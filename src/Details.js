import React from "react";
import axios from "axios";
import { Link } from "@reach/router";
import { FiTrash2 } from "react-icons/fi";
import { IoMdCreate } from "react-icons/io";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemdata: [],
      error: false
    };
  }
  componentDidMount() {
    this.fetchData();
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
  deleteOrder(event) {
    let order_id = event;
    console.log(order_id);
    axios({
      method: "delete",
      url: "http://localhost:8080/api/order/" + order_id,
      headers: { Authorization: localStorage.token }
    })
      .then(function(response) {
        window.location.reload();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  render() {
    const { id } = this.props;
    const { name, price, count } = this.props;
    let center = {
      position: "relative",
      left: "50%",
      marginLeft: "-100px",
      top: "50%"
    };

    let buttonSize = { height: "50px", width: "50px", marginRight: "20px" };
    if (!localStorage.token) {
      return <Redirect to="/" noThrow />;
    } else {
      return (
        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Units</th>
                </tr>
              </thead>
              <tbody>
                {this.state.itemdata.map(item => {
                  return (
                    <tr>
                      <th scope="row">{item.name}</th>
                      <td>{item.price}</td>
                      <td>{item.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={center}>
              <Link to={"/orderEdit/" + id}>
                <button
                  type="button"
                  className="btn btn-info"
                  style={buttonSize}
                >
                  <IoMdCreate />
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                style={buttonSize}
                onClick={this.deleteOrder.bind(this, id)}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Details;
