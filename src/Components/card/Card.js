import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Card.css";

export default function Card(props) {
  
  toast.configure()
  function forLike() {
    
    if (props.isLiked === "false") {
      toast(`You liked ${props.title} movie.`,{autoClose:3000})
     
      
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
    }
    else {
      toast(`disliked ${props.title} movie.`,{autoClose:3000})
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

  return (
    <div className="col-md-3 mt-3">
      <div className="card">
        <div className="box w-100 p-2">
          <Link to={`/movieDetail/${props.movieid}`}>
            <img
              src={props.posterUrl}
              alt=""
              className="w-100"
              height="300px"
            />
          </Link>

          <h6 className="mt-4">{props.title}</h6>
          
          <div>
            {props.status && (
              <small>
                {props.isLiked==="true"? (
                  <i
                    className="fa fa-2x fa-heart text-danger"
                    onClick={forLike}
                  ></i>
                
                ):( 
                  <i className="fa fa-2x fa-heart-o" onClick={forLike}></i>
                )}
              </small>
            )
            }
            {props.status&&<span className="mx-1 fs-5">{props.likeCounts}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
