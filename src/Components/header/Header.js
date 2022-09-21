import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function (props) {
  const [title, setTitle] = useState("");
  const [checkPre, setcheckPre] = useState(true);
  const [placeholder, setplaceholder] = useState("Enter movie name");
  function check(data) {
    if (data.length === 0) {
      setplaceholder("Please enter the movie");

      setcheckPre(true);
    } else {
      setTitle(data);
      setcheckPre(false);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            width="50px"
            height="40px"
          />
          <h5 className="text-white d-inline mx-2">USER APP</h5>
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <div className="navbar-nav me-auto mb-lg-0">
            
              {props.loggedStatus ? (
                <Link to="/home" className="btn nav-link">
                  <button className="btn nav-link d-inline" aria-current="page">
                    Home
                  </button>
                </Link>
                ) : null}
            
          </div>

          <ul className="navbar-nav ml-auto mb-lg-0">
          <li className="nav-item">
            {console.log(props.loggedStatus)}
            {props.loggedStatus ? (
              <button className="btn nav-link d-inline" aria-current="page">
              <Link to="/logout" type="button" className="btn btn-light">
                
                  Logout
              
              </Link>
              </button>
            ) : (
              <button className="btn nav-link d-inline" aria-current="page">
              <Link to="/" type="button" className="btn btn-light">
                
                  Login
                
              </Link>
              </button>
            )}
          </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
