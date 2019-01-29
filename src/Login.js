import React from "react";
import axios from "axios";
import { navigate, Redirect } from "@reach/router";
import validator from "validator";
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false
    };
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }
  setPassword(event) {
    this.setState({ password: event.target.value });
  }
  sendCredentials() {
    if (!validator.isEmail(this.state.email)) {
      alert(`${this.state.email} is not a valid email.`);
    } else {
      axios({
        method: "post",
        url: "http://localhost:8080/api/login",
        data: { email: this.state.email, password: this.state.password }
      })
        .then(function(response) {
          if (response.data.status == "No Such a User!") {
            alert("No Such a User!");
          } else if (response.data.status == "Invalid Credentials!") {
            alert("Invalid Credentials!");
          } else if (response.data.status == "login Okay!") {
            localStorage.setItem("token", response.data.token);
            navigate("/orders");
            console.log(localStorage.token);
          }
        })
        .catch(function(err) {
          this.setState({ error: true });
        });
    }
  }
  render() {
    let center = {
      position: "relative",
      left: "43%",
      marginLeft: "-100px",
      marginTop: "15%"
    };
    let buttonSize = { height: "70px", width: "200px", marginRight: "20px" };
    let inputFieldSize = { width: "400px" };
    if (localStorage.token) {
      return <Redirect to="/orders" noThrow />;
    } else {
      return this.state.error ? (
        <div className="alert alert-danger">
          <strong>Error!</strong> Application Failed!
        </div>
      ) : (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
              <h1>Home</h1>
            </a>
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
          </nav>
          <div />
          <div style={center}>
            <form>
              <div className="form-group">
                <label>
                  <h4>Email address</h4>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  style={inputFieldSize}
                  onChange={this.setEmail.bind(this)}
                />
              </div>
              <div className="form-group">
                <label>
                  <h4>Password</h4>
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  style={inputFieldSize}
                  onChange={this.setPassword.bind(this)}
                />
              </div>
              <button
                type="button"
                className="btn btn-info"
                style={buttonSize}
                onClick={this.sendCredentials.bind(this)}
              >
                <h3>Login</h3>
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}
export default Login;
