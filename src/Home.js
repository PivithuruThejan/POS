import React from "react";
import { Redirect } from "@reach/router";
class Home extends React.Component {
  render() {
    let backgroundImage = {
      height: 900,
      width: "auto",
      backgroundImage:
        "url(https://cdn.jamieoliver.com/home/wp-content/uploads/2016/06/2.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    };
    let center = {
      position: "relative",
      left: "43%",
      marginLeft: "-100px",
      top: "50%"
    };
    let buttonSize = { height: "100px", width: "200px", marginRight: "20px" };
    if (localStorage.token) {
      return <Redirect to="/orders" noThrow />;
    } else {
      return (
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

          <div style={backgroundImage}>
            <div style={center}>
              <a href="/login">
                <button
                  type="button"
                  className="btn btn-info"
                  style={buttonSize}
                >
                  <h3>Login</h3>
                </button>
              </a>
              <a href="/register">
                <button
                  type="button"
                  className="btn btn-info"
                  style={buttonSize}
                >
                  <h3>Register</h3>
                </button>
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
