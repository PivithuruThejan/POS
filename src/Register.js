import React from "react";
import axios from "axios";
import { navigate, Redirect } from "@reach/router";
import validator from "validator";

class Register extends React.Component {
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
    let passwordValidator = require("password-validator");
    var schema = new passwordValidator();
    schema
      .is()
      .min(5)
      .is()
      .max(25)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .not()
      .spaces();
    if (!validator.isEmail(this.state.email)) {
      alert(`${this.state.email} is not a valid email.`);
    } else if (!schema.validate(this.state.password)) {
      alert(
        "Your password should have 5 - 25 characters, uppercase, lowecase, digits and no spaces!"
      );
    } else {
      axios({
        method: "post",
        url: "http://localhost:8080/api/register",
        data: { email: this.state.email, password: this.state.password }
      })
        .then(function(response) {
          if (response.data == "User Already Exists!") {
            alert("User Already Exists!");
          } else {
            localStorage.setItem("token", response.data);
            navigate("/orders");
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
                <h3>Register</h3>
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default Register;
