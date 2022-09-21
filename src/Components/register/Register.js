import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [image , setImage] = useState("");
  const [name, setname] = useState("");
  const [address,setAddress] = useState("");
  const [email, setemail] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [password, setpassword] = useState(false);
  const [phone, setphone] = useState("");
  const [age, setage] = useState("");
  const [visibleLoginError, setvisibleLoginError] = useState(false);
  const [submit, setsubmit] = useState(false);
  const history = useHistory();

  function onChangeHandler(e){
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  useEffect(() => {
    if (
      name !== "" &&
      email !== "" &&
      cpassword !== "" &&
      phone !== "" &&
      age !== ""&&
      address!== ""
    ) {
      setsubmit(true);
      document.getElementById("errorForm").innerHTML = "";
    } else {
      setsubmit(false);
      document.getElementById("errorForm").innerHTML = "";
    }
  }, [name, email, cpassword, phone, age,address, visibleLoginError]);

  const formData = new FormData();
  
  formData.append('name',name);
  formData.append('address',address);
  formData.append('email',email);
  formData.append('password',cpassword);
  formData.append('phone',phone)
  formData.append('age',age);
  formData.append('image',image);

  function check() {
    

    fetch("http://localhost:8765/api/v1/register", {
      method: "post",
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        // 'Content-Type': 'multipart/form-data',
      },
      // body: JSON.stringify(user),
      body : formData
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          res.text().then((text) => {
            console.log(text);
            console.log("text");
            setvisibleLoginError(true);
            loginError(text);
            return null;
          });
        } else {
          console.log("else");
          return res.json();
        }
      })
      .then((data) => {
        setTimeout(() => {
          console.log("data"+data);
        console.log("hell");
        setvisibleLoginError(false);
        history.push("/");
        }, 1000);
      })
      .catch((error) => console.log(error.status));
  }

  function loginError(text) {
    document.getElementById("loginErrorText").innerHTML = text;
  }
  function nameValidation(data) {
    if (data === "") {
      document.getElementById("errorName").innerHTML =
        "User name field should not be empty.";
      setname("");
    } else if (!data.match("^([a-zA-Z]+(\\s[a-zA-Z]+)?)$")) {
      document.getElementById("errorName").innerHTML =
        "User name can only contain alphabets.<br > A space is allowed between first name and last name.";
      setname("");
    } else {
      document.getElementById("errorName").innerHTML = "";
      setname(data);
    }
  }
  function addressValidation(data) {
    if (data === "") {
      document.getElementById("errorAddress").innerHTML =
        "Address field should not be empty.";
      setAddress("");
    }
    //  else if (!data.match("^([a-zA-Z0-9#\\s]+)$")) {
    //   document.getElementById("errorName").innerHTML =
    //     "User name can only contain alphabets.<br > A space is allowed between first name and last name.";
    //   setname("");
    // } 
    else {
      document.getElementById("errorAddress").innerHTML = "";
      setAddress(data);
    }
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
    if (data !== "" && data.length < 5) {
      document.getElementById("strongability").innerHTML = "Weak password...";
      document.getElementById("strongability").style.color = "red";
    } else if (data !== "" && data.length < 9) {
      document.getElementById("strongability").innerHTML = "Medium password...";
      document.getElementById("strongability").style.color = "darkblue";
    } else if (data !== "" && data.length > 8) {
      document.getElementById("strongability").innerHTML = "Strong password...";
      document.getElementById("strongability").style.color = "lightgreen";
    } else {
      document.getElementById("strongability").innerHTML = "";
    }

    if (data === "") {
      document.getElementById("errorPass").innerHTML =
        "Password field should not be empty.";
    } else if (!data.match("(?=.*[A-Z])(?=.*[0-9])(?=.*[\\W])")) {
      document.getElementById("errorPass").innerHTML =
        "At least one capital letter should be there.<br>At least one number should be there.<br>At least one special character should be there.";
    } else {
      document.getElementById("errorPass").innerHTML = "";
    }

    if (data !== "" && document.getElementById("errorPass").innerHTML === "") {
      setpassword(true);
    } else {
      setpassword(false);
    }
  }

  function cPassValidation(data) {
    if (data !== document.getElementById("password").value) {
      document.getElementById("errorCPass").innerHTML = "password mismatch.";
      document.getElementById("errorCPass").style.color = "red";
      setcpassword("");
    } else {
      document.getElementById("errorCPass").innerHTML = "password matched.";
      document.getElementById("errorCPass").style.color = "green";
      setcpassword(data);
    }
  }

  function ageValidation(data) {
    if (data === "") {
      document.getElementById("errorAge").innerHTML =
        "Age field should not be empty.";
      setage("");
    } else if (data < 1 || data > 100) {
      document.getElementById("errorAge").innerHTML = "Invalid age.";
      setage("");
    } else {
      document.getElementById("errorAge").innerHTML = "";
      setage(data);
    }
  }

  function phoneValidation(data) {
    if (data === "") {
      document.getElementById("errorPhone").innerHTML =
        "Phone field should not be empty.";
      setphone("");
    } else if (data.match("[a-zA-Z\\W]")) {
      document.getElementById("errorPhone").innerHTML =
        "Please type only digits.";
      setphone("");
    } else if (data.length < 10) {
      document.getElementById("errorPhone").innerHTML = "Less than 10 digits.";
      setphone("");
    } else if (data.length === 10 && !data.match("^[6-9][0-9]{9}$")) {
      document.getElementById("errorPhone").innerHTML =
        "Invalid mobile number format.";
      setphone("");
    } else if (data.length > 10) {
      document.getElementById("errorPhone").innerHTML = "More than 10 digits.";
      setphone("");
    } else {
      document.getElementById("errorPhone").innerText = "";
      setphone(data);
    }
  }

  function formInvalid() {
    document.getElementById("errorForm").innerHTML = "Form is incomplete.";
  }

  function closeLoginError() {
    document.getElementById("loginError").innerHTML = "";
    setvisibleLoginError(false)
  }
  return (
    <div
      id="formContainer"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image/loginBack.png)`,
      }}
    >
      <form id="form" className="rounded shadow" action="#" method="POST">
        <fieldset>
          <h1
            className="fw-bold fs-4"
            style={{
              color: "white",
              fontFamily: "Barlow Condensed, sans-serif",
            }}
          >
            Registration Form
          </h1>

          {visibleLoginError && (
            <div
              id="loginError"
              className="bg-danger mx-5 text-white p-2 rounded"
            >
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
          )}
          <div id="image">
            <input
              type="file"
              className="form-control"
              onChange={e=>onChangeHandler(e)}
            />

          </div>
          <div id="fullName">
            <input
              type="text"
              className="form-control"
              onChange={(e) => nameValidation(e.target.value)}
              name="fName"
              id="name"
              placeholder="Enter name"
              required
            />
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="text-danger mx-2" id="errorName"></p>
            </div>
          </div>

          <div id="otherInputs">
            <input
              type="email"
              className="form-control"
              onChange={(e) => emailValidation(e.target.value)}
              name="email"
              id="email"
              placeholder="Enter Email Address"
              required
            />
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="text-danger mx-2" id="errorEmail"></p>
            </div>

            <input
              type="password"
              className="form-control"
              onChange={(e) => passValidation(e.target.value)}
              name="password"
              id="password"
              placeholder=" Enter Password"
              required
            />
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="mx-2" id="strongability"></p>
            </div>
            <div style={{ textAlign: "left", marginTop: "-12px" }}>
              <p className="text-danger mx-2" id="errorPass"></p>
            </div>

            {password ? (
              <input
                type="password"
                className="form-control"
                onChange={(e) => cPassValidation(e.target.value)}
                name="confirm password"
                id="cpassword"
                placeholder=" Confirm Password"
                required
              />
            ) : (
              <input
                type="password"
                className="form-control"
                onChange={(e) => cPassValidation(e.target.value)}
                name="confirm password"
                id="cpassword"
                placeholder=" Confirm Password"
                disabled
              />
            )}
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="mx-2" id="errorCPass"></p>
            </div>
            <input
              type="number"
              className="form-control"
              onChange={(e) => ageValidation(e.target.value)}
              name="age"
              id="age"
              min="1"
              max="100"
              placeholder="Enter Age"
              required
            />
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="mx-2 text-danger" id="errorAge"></p>
            </div>
            <input
              className="form-control"
              type="mobile"
              onChange={(e) => phoneValidation(e.target.value)}
              pattern="[0-9]{10}"
              name="phone"
              id="phone"
              placeholder="Enter Mobile  Number"
              required
            />
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="mx-2 text-danger" id="errorPhone"></p>
            </div>
            <input
              className="form-control"
              type="text"
              onChange={(e) => addressValidation(e.target.value)}
              name="address"
              id="address"
              placeholder="Enter current address"
              required
            />
            <div style={{ textAlign: "left", marginTop: "-10px" }}>
              <p className="mx-2 text-danger" id="errorAddress"></p>
            </div>
          </div>

          <div>
            <p className="mx-2 text-danger" id="errorForm"></p>
          </div>

          {submit ? (
            <div className="btn" name="submit" onClick={check} id="submit">
              Submit
            </div>
          ) : (
            <div className="btn" id="submit" onClick={formInvalid}>
              Submit
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
}
