import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import DisplayCard from "../displaycard/DisplayCard";
import { v4 as uuidv4 } from "uuid";

export default function SearchResult(props) {
  const { title } = useParams();
  const [movie, setmovie] = useState({});
  const [triggerForLike, settriggerForLike] = useState(false);

  function setLikeFunc() {
    setTimeout(() => {
      if(triggerForLike){
        settriggerForLike(false);
      }
      else{
        settriggerForLike(true)
      }
    }, 1000);
  }

  useEffect(() => {
    if(localStorage.getItem('token')!==null&&localStorage.getItem('token')!==undefined){
        fetch(`http://localhost:8765/api/v2/movies/search/${title}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setmovie(data[0]);
            });
    }
    else{
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=f737cd2c2070147264ea7d0b50d3dbf1&query=${title}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data.results);
              const movieData = data.results.filter(
                (result) => result.title.toUpperCase() === title.toUpperCase()
              )[0];
              console.log(movieData);
              setmovie(movieData);
            });
    }
  }, [title,triggerForLike]);
  return (
    <div>
      {movie == null ? (
        <div className="text-center mt-5 ">
          <img src={process.env.PUBLIC_URL + "/not_found.png"} />
          <div className="text-dark">Search with another movie</div>
        </div>
      ) : (
        <DisplayCard
          key={uuidv4()}
          setLikeFunc={setLikeFunc}
          overview={movie.overview}
          likeCounts={movie.likeCount}
          isLiked = {movie.isLiked}
          posterUrl={"https://image.tmdb.org/t/p/original" + movie.poster_path}
          title={movie.title}
          movieid={movie.id}
          status={props.loggedStatus}
        />
      )}
    </div>
  );
}
