import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./MovieDetail.css";
export default function MovieDetail() {
  const { movieid } = useParams();
  const [movie, setmovie] = useState({});
  const [cast, setcast] = useState([]);
  const [comments, setcomments] = useState([]);
  const [inputcommment, setinputcommment] = useState("");
  const [render, setrender] = useState(false);
  const [isFav, setisFav] = useState(true);
  const [editComId, seteditComId] = useState("");

  useEffect(() => {
    //Fetch Movie data using movie id
    fetch(
      `https://api.themoviedb.org/3/movie/${movieid}?api_key=0c0b61ddfb12f5fa53e6d702c54139cc`
    )
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        setmovie(data);
      });

    //fetch cast data using movie id
    fetch(
      `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=0c0b61ddfb12f5fa53e6d702c54139cc`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.cast);
        setcast(data.cast);
      });

    //fetch comments for a movie from backend
    fetch(`http://localhost:8765/api/v1/movies/${movieid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length != 0) {
          console.log("comments"+ data);
          setcomments(data);
        }
      })
      .catch((err) => console.log(err));
    setrender(false);
  }, [movieid, render]);

  const user = {
    id:editComId,
    title: movie.title,
    rating: movie.popularity,
    description: movie.overview,
    comment: inputcommment,
    movieId: movieid,
    isLiked: "false",
    posterUrl: movie.poster_path,
    isFavourite: "false",
    isRecommended: "false",
  };

  function saveComment() {
    console.log("user "+user);
    fetch(`http://localhost:8765/api/v2/movies/comment`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    setrender(true);
    setisFav(false);
    seteditComId("");
  }

  function showAlert() {
    alert("Please put comment before adding to favourite.");
  }

  function addFav(){

  const userFav = {
    
    title: movie.title,
    rating: movie.popularity,
    description: movie.overview,
    comment: "",
    movieId: movieid,
    isLiked: "false",
    posterUrl: movie.poster_path,
    isFavourite: "true",
    isRecommended: "false",
  };
    fetch(`http://localhost:8765/api/v2/movies/addFav`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFav),
      });
      
  }

  function setEditComId(comment,id) {
      document.getElementById("floatingTextarea2").value=comment;
      seteditComId(id);
 }


  return (
    <div className="container-fluid mt-3 pb-5">
      <div className="position-relative">
        <div
          className="head"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            height: "500px",
          }}
        ></div>
        <div className="position-absolute top-0 ">
          <div className="main px-4 pt-5">
            <div className="d-flex">
              <div className="flex-shrink-0">
                <img
                  className="shadow rounded"
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.poster_path
                  }
                  alt="image"
                  height="350vh"
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <div className="title">
                  <h1 className="text-dark">{movie.title}</h1>
                  <br></br>
                  {/* <div>
                    <i className="fa fa-heart" style={{ fontSize: "35px" }}></i>
                    <i
                      className="fa fa-floppy-o mx-4"
                      aria-hidden="true"
                      style={{ fontSize: "35px" }}
                    ></i>
                  </div> */}
                  <br></br>
                  <h4>Overview</h4>
                  <p>{movie.overview}</p>

                  <div className="d-flex justify-content-around">
                    <div>
                      <h5>Release date</h5>
                      <p>{movie.release_date}</p>
                    </div>
                    <div>
                      <h5>Popularity</h5>
                      <p>{movie.popularity}</p>
                    </div>
                    <div>
                      <h5>Duration</h5>
                      <p>
                        {Math.floor(movie.runtime / 60) +
                          "" +
                          "hr" +
                          (movie.runtime % 60) +
                          "min"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="mt-5">
          <div>
            <h3 style={{ fontFamily: "Odibee Sans, cursive" }}>Movie Cast</h3>
            <div className="container scroll d-flex py-3">
              {cast
                .filter((ele) => ele.profile_path !== null)
                .map((item) => (
                  <div key={uuidv4()} className="mx-2 shadow-lg">
                    <span
                      className="card"
                      style={{ width: "12rem", height: "24rem" }}
                    >
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          item.profile_path
                        }
                        className="card-img-top"
                        alt="Profile"
                      />
                      <div className="card-body">
                        <h6 className="card-text">{item.original_name}</h6>
                        <p className="card-text">{item.character}</p>
                      </div>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="comment my-3">
          {comments.length != 0 && (
            <h5
              className="comments mx-4 mt-5 mb-3"
              style={{ fontFamily: "Odibee Sans, cursive" }}
            >
              Comments
            </h5>
          )}
          {comments.length != 0 &&
            comments.map((item) => (
              <div key={uuidv4()} className="card comments w-75 mx-5 mt-3">
                <div id="comment-header" className=" fw-bold d-flex rounded justify-content-between border-bottom border-bottom-dark">
                  <div className="mx-1 my-2">
                  {(item.userEmail + "").substring(
                    0,
                    (item.userEmail + "").indexOf("@")
                  )}
                  </div>
                  
                  {
                    
                    localStorage.getItem('userName')===(item.userEmail + "").substring(
                      0,
                      (item.userEmail + "").indexOf("@")
                    )&&<div onClick={()=>setEditComId(item.comment,item.id)}>
                    <button type="button" className="btn btn-secondary">Edit</button>
                  </div>

                  }
                </div>
                <div className="mx-3 my-2">
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}
          {
            (localStorage.getItem('token')!==null&&localStorage.getItem('token')!==undefined)&&<div className="input-group mt-5 mx-5 w-75 ">
            <div className="form-floating form-control">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setinputcommment(e.target.value)}
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                rows="4"
                cols="50"
              ></input>
              <label
                htmlFor="floatingTextarea2"
                className="text-muted mx-3 mt-3"
              >
                leave a comment here
              </label>
            </div>

            {inputcommment.length === 0 ? (
              <div className="input-group-text" id="btnGroupAddon">
                <button type="button" className="btn" disabled>
                  <i
                    onClick={saveComment}
                    className="fa fa-2x fa-paper-plane text-primary"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            ) : (
              <div className="input-group-text" id="btnGroupAddon">
                <button type="button" className="btn">
                  <i
                    onClick={saveComment}
                    className="fa fa-2x fa-paper-plane text-primary"
                    aria-hidden="true"
                    id="fa-plane"
                  ></i>
                </button>
              </div>
            )}
          </div>
          }
          {
            (localStorage.getItem('token')!==null&&localStorage.getItem('token')!==undefined)&&<div>
            { isFav ? (
              <div className="text-left mt-3 mx-5 mb-5" style={{textAlign:"left"}}>
                <div
                className="d-inline"
                style={{ textAlign: "left", fontFamily: "Lobster, cursive" }}
                onClick={showAlert}
              >
                <button
                  type="button"
                  className=" btn btn-info fw-bold text-dark"
                  disabled
                >
                  <span>Add to Favourite</span>
                </button>
              </div>
              </div>
            ) : (
              <div className="text-left mt-3 mx-5 mb-5" style={{textAlign:"left"}}>
                <div
                className="d-inline  mt-3 "
                style={{ textAlign: "left", fontFamily: "Lobster, cursive" }}
                onClick={addFav}
              >
               <Link to="/favourite"> <button
                  type="button"
                  className="btn btn-info  fw-bold text-dark opacity-3"
                  id="fav"
                >
                  Add to Favourite
                </button></Link>
                <span id="favspan" className="text-danger"></span>
              </div>
              </div>
            )}
          </div>
          }
        </section>
      </div>
    </div>
  );
}
