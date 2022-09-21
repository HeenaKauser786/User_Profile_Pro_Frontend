import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [submit, setsubmit] = useState(false);
  const [visibleLoginError, setvisibleLoginError] = useState(false);
  const history=useHistory();


  // toast.configure();

  useEffect(() => {
    if (email !== "" && password !== "") {
      setsubmit(true);
      document.getElementById("errorForm").innerHTML = "";
    } else {
      setsubmit(false);
      document.getElementById("errorForm").innerHTML = "";
    }
  }, [email, password,visibleLoginError]);

  const user = {
    email: email,
    password: password,
  };

  function fetchReq() {
    fetch("http://localhost:8765/api/v1/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          res.text().then((text) => {
            setvisibleLoginError(true);
            loginError(text);
          });
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(...data.token);
        setvisibleLoginError(false);
        localStorage.setItem("token", data.token);
        props.loginStatus(true);
        localStorage.setItem("userName", email.substring(0, email.indexOf("@")));
        localStorage.setItem("email", email);
        history.push("/home")
      })
      .catch((error) => console.log(error.status));
    
  }
  function loginError(text) {
    document.getElementById('loginErrorText').innerHTML=text
  }
  function emailValidation(data) {
    if (data === "") {
      document.getElementById("errorEmail").innerHTML =
        "Email field should not be empty.";
      setemail("");
    } else if (!data.match("^[a-zA-Z0-9._%+-]+[a-zA-Z0-9]+@[a-zA-Z]{3,}.(com|in|org)$")) {
      document.getElementById("errorEmail").innerHTML = "Email is not correct.";
      setemail("");
    } else {
      document.getElementById("errorEmail").innerHTML = "";
      setemail(data);
    }
  }
  function passValidation(data) {
    if (data === "") {
      document.getElementById("errorPass").innerHTML =
        "Password field is required.";
      document.getElementById("errorPass").style.color = "red";
      setpassword("");
    } else {
      document.getElementById("errorPass").innerHTML = "";
      setpassword(data);
    }
  }
  function formInvalid() {
    document.getElementById("errorForm").innerHTML = "Form is incomplete.";
  }
  // const notify = ()=>{
  //   toast("Basic notification",{position:toast.POSITION.TOP_CENTER})
  // }

  function closeLoginError() {
    document.getElementById("loginError").innerHTML = "";
    setvisibleLoginError(false)
  }
  return (
    
    <div className="bg-danger" id="LoginPage" style={{height:'100vh',backgroundImage:`url(${process.env.PUBLIC_URL}/image/loginBack.png)`}}>
      <div className="container">
        <div className="row">
          <div className=" offset-sm-1 col-md-8 offset-md-2" style={{marginTop:'5vh',marginBottom:"4vh"}}>
            <div className="sign-panels">
              <div className="login">
                <h3 className="mb-4 text-primary">Login Here</h3>
                {/* <Link to="/"><button onClick={notify} >notify</button></Link> */}
                {
                visibleLoginError&&<div id="loginError" className="bg-danger mx-5 text-white p-2 rounded">
                  <div className="d-flex justify-content-between">
                    <div id="loginErrorText"></div>
                    <button
                      type="button"
                      onClick={closeLoginError}
                      className="btn-close"
                      data-bs-dismiss="custom"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
                }

                <form action="">
                  <input
                    type="text"
                    onChange={(e) => emailValidation(e.target.value)}
                    placeholder="Username"
                    required
                  />
                  <div style={{ textAlign: "left", marginTop: "-10px" }}>
                    <p className="text-danger mx-4 fs-6" id="errorEmail"></p>
                  </div>
                  <input
                    type="password"
                    onChange={(e) => passValidation(e.target.value)}
                    placeholder="Password"
                    required
                  />

                  <div style={{ textAlign: "left", marginTop: "-12px" }}>
                    <p className="text-danger mx-4" id="errorPass"></p>
                  </div>

                  <div>
                    <p className="text-danger mx-4" id="errorForm"></p>
                  </div>

                  {submit ? (
                    <Link>
                      <div
                        onClick={fetchReq}
                        
                        className="btn btn-signin"
                      >
                        Login
                      </div>
                      </Link>
                  ) : (
                    <Link>
                    <div className="btn btn-signin" onClick={formInvalid} >
                      Login
                    </div>
                    </Link>
                  )}
                  <Link to="/register">
                    <button type="submit" className="btn btn-signin">
                      Register
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
