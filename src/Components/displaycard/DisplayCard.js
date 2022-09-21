import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./DisplayCard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DisplayCard(props) {
  const [editBol, setEditBol] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const history = useHistory();
  toast.configure();

  function forLike() {
    if (props.isLiked === "false") {
      toast(`You liked ${props.title} movie`, { autoClose: 3000 });
      console.log("liking false");

      const user = {
        title: props.title,
        rating: props.rating,
        description: props.overview,
        comment: "",
        movieId: props.movieid,
        isLiked: "true",
        posterUrl: props.posterUrl,
        isFavourite: "false",
        isRecommended: "false",
      };
      fetch(`http://localhost:8765/api/v2/movies/updateLike`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    } else {
      toast(`Disliking ${props.title} movie`, { autoClose: 3000 });
      const user = {
        title: props.title,
        rating: props.rating,
        description: props.overview,
        comment: "",
        movieId: props.movieid,
        isLiked: "false",
        posterUrl: props.posterUrl,
        isFavourite: "false",
        isRecommended: "false",
      };
      fetch(`http://localhost:8765/api/v2/movies/updateLike`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    }
    props.setLikeFunc();
  }

  function editDisappear() {
    if (editBol == false) {
      document.getElementById("edit").innerHTML = "";
    }
    setEditBol(false);
  }

  function changeProfile(img) {
    setProfileImage(img);
    const url = URL.createObjectURL(img);
    console.log(url);
    document.getElementById("image").src = url;
  }

  function cancelEdit() {
    document.getElementById("image").src = props.image;
    setEditBol(true);
  }

  const formData = new FormData();

  function saveProfile() {
    if (name !== "") {
      formData.append("name", name);
      toast.info("Name is changed !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3550,
      });
    } else {
      formData.append("name", props.name);
    }

    if (password != "") {
      formData.append("password", password);
      toast.info("Password is changed !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3550,
      });
    } else {
      formData.append("password", props.password);
    }

    if (age !== "") {
      formData.append("age", age);
      toast.info("Age is changed !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3550,
      });
    } else {
      formData.append("age", props.age);
    }

    if (phone !== "") {
      formData.append("phone", phone);
      toast.info("Phone Number is changed !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3550,
      });
    } else {
      formData.append("phone", props.phone);
    }

    if (address !== "") {
      formData.append("address", address);
      toast.info("Address is changed !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3550,
      });
    } else {
      formData.append("address", props.address);
    }

    if (profileImage !== "") {
      formData.append("image", profileImage);
      toast.info("Profile Image is changed !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3550,
      });
    } else {
      formData.append("image", props.image);
    }

    formData.append("email", props.email);
    console.log(formData);

    fetch("http://localhost:8765/api/v1/updateUserProfile", {
      method: "post",
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        // 'Content-Type': 'multipart/form-data',
      },
      // body: JSON.stringify(user),
      body: formData,
    }).then((res) => {
      toast.info("Saving in progress !", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3550,
      });
      setTimeout(() => {
        console.log("4 sec wait");
        if (res.ok) {
          history.push("/home");
        }
      }, 4000);
    });
  }

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="container my-4 pb-5 ">
      <div className=" container p-3 my-4 w-50 bg-secondary">
        <div className="box">
          <div className="p-2 bg-dark">
            <div className="text-end" id="edit">
              {editBol && (
                <a
                  className="pe-auto p-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Edit profile"
                  onClick={editDisappear}
                >
                  <i
                    className="fa fa-2x edit fa-pencil-square-o"
                    aria-hidden="true"
                  ></i>
                </a>
              )}
            </div>
            <img
              className="img-fluid box rounded"
              id="image"
              src={`${props.image}`}
            />
          </div>

          {editBol && (
            <div className=" py-3">
              <div className="d-flex  bd-highlight">
                <div className="p-2 fw-bold w-50 bg-light">Name</div>
                <div className="p-2 w-50 bg-light text-start ">
                  {props.name}
                </div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-2 fw-bold w-50 bg-light">Email</div>
                <div className="p-2 w-50 bg-light text-start">
                  {props.email}
                </div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-2 fw-bold w-50 bg-light">Age</div>
                <div className="p-2 w-50 bg-light text-start">{props.age}</div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-2 fw-bold w-50 bg-light">Mobile</div>
                <div className="p-2 w-50 bg-light text-start">
                  {props.phone}
                </div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-2 fw-bold w-50 bg-light">Address</div>
                <div className="p-2 w-50 bg-light text-start">
                  {props.address}
                </div>
              </div>
            </div>
          )}

          {!editBol && (
            <div className=" py-3">
              <div className="d-flex bd-highlight">
                <div className="p-4 fw-bold w-50 bg-light">Profile Image</div>
                <div className="px-2 py-2 w-50 bg-light text-start ">
                  <input
                    onChange={(e) => changeProfile(e.target.files[0])}
                    className="form-control"
                    id="image"
                    type="file"
                  />
                </div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-4 fw-bold w-50 bg-light">Name</div>
                <div className="px-2 py-2 w-50 bg-light text-start ">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder={props.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-4 fw-bold w-50 bg-light">Password</div>
                <div className="d-flex px-2 py-2 w-50 bg-light text-start ">
                  <div>
                    <input
                      className="form-control"
                      id="password"
                      type={passwordType}
                      placeholder={props.password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {passwordType === "password" ? (
                    <div>
                      <i
                        className="fa editEye fa-2x mt-1 p-2 fa-eye-slash"
                        onClick={togglePassword}
                      ></i>
                    </div>
                  ) : (
                    <div>
                      <i
                        className="fa editEye fa-2x mt-1 p-2 fa-eye"
                        onClick={togglePassword}
                      ></i>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex bd-highlight">
                <div className="p-4 fw-bold w-50 bg-light">Email</div>
                <div className=" w-50 bg-light text-start">
                  <input
                    className="form-control mt-3"
                    id="email"
                    type="email"
                    value={props.email}
                  />

                  <p className="text-end my-0">
                    <small className="text-end text-muted">
                      *Email can't be edited.{" "}
                    </small>
                  </p>
                </div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-4 fw-bold w-50 bg-light">Age</div>
                <div className="p-2 w-50 bg-light text-start">
                  <input
                    className="form-control"
                    id="age"
                    type="number"
                    placeholder={props.age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-4 fw-bold w-50 bg-light">Mobile</div>
                <div className="p-2 w-50 bg-light text-start">
                  <input
                    className="form-control"
                    id="phone"
                    type="tel"
                    placeholder={props.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex bd-highlight">
                <div className="p-4 fw-bold w-50 bg-light">Address</div>
                <div className="p-2 w-50 bg-light text-start">
                  <textarea
                    className="form-control"
                    id="address"
                    rows="4"
                    cols="50"
                    onChange={(e) => setAddress(e.target.value)}
                  >
                    {props.address}
                  </textarea>
                </div>
              </div>
            </div>
          )}
          {!editBol && (
            <div>
              <div className="d-flex pb-3 justify-content-around align-items-end">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-info"
                  onClick={saveProfile}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
