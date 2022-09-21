import React, {useEffect, useState } from "react";

import FavCard from "../favCard/FavCard";

export default function Favourite() {
  const [user, setuser] = useState([]);
  const [triggerForLike, settriggerForLike] = useState(false);
  const [triggerForDelete, settriggerForDelete] = useState(false);
 
  useEffect(() => {
    setTimeout(()=>{
      fetch("http://localhost:8765/api/v2/movies/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setuser(data);
      })
      .catch((err) => console.log(err));
    },1000)
  }, [triggerForLike,triggerForDelete]);
  function setLikeFunc() {
    if(triggerForLike){
      settriggerForLike(false);
    }
    else{
      settriggerForLike(true)
    }
  }
  function deleteFunc() {
    if(triggerForDelete){
      settriggerForDelete(false);
    }
    else{
      settriggerForDelete(true)
    }
  }

  return (
    <div>
      
      <div className="container mt-3" data-testid="outerdiv" style={{minHeight:"100vh",paddingBottom:"20vh"}}>
        <div className="row" data-testid="innerdiv">
          {user.length!==0&&user.map((item) => (
            <FavCard
            key={item.id}
            rating={item.popularity}
            isLiked={item.isLiked}
            likeCounts={item.likeCount}
            overview={item.overview}
            setLikeFunc={setLikeFunc}
            posterUrl={
              "https://image.tmdb.org/t/p/original" + item.poster_path
            }
            movieid={item.id}
            title={item.title}
            deleteFunc={deleteFunc}
            />
          ))}
          {
            user.length===0&&<div className="container p-5 my-5 bg-danger fs-1 text-white fw-bold">Nothing is Present in Favourite List.</div>
          }
        </div>
      </div>
    </div>
  );
}
