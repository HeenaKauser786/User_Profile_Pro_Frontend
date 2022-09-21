import React, { useEffect, useState } from "react";
import DisplayCard from "../displaycard/DisplayCard";
import { v4 as uuidv4 } from "uuid";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [img,setImg] = useState("");
  const [user, setUser] = useState([]);
  const [triggerForLike, settriggerForLike] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token')!==null&&localStorage.getItem('token')!==undefined){
      fetch(`http://localhost:8765/api/v1/user/${localStorage.getItem("email")}`,{
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.token}`,
        // Accept: "application/json",
        // "Content-Type": "application/json",
      }})
      .then((result) => result.json())
      .then((res) => {
        console.log("came");
        setUser(res);
      });
    }
    
  },[props]);

  useEffect(() => {
    if(localStorage.getItem('token')!==null&&localStorage.getItem('token')!==undefined){


      fetch(`http://localhost:8765/api/v1/userImage/${localStorage.getItem("email")}`,{
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.token}`,
    
      }})
      .then((result) => result.blob())
      .then((res) => {
    
        const imageObjectURL = URL.createObjectURL(res);
        console.log("res imageurl "+imageObjectURL);
        setImg(imageObjectURL);
        
      });
    }
    
  },[props]);

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
  



  return (
    <div>
      <div className="container mt-3" data-testid="outerdiv">
        <h4
          className="mt-5 fw-bold"
          style={{
            fontFamily: "Big Shoulders Stencil Display, cursive",
            textAlign: "center",
          }}
        >
          User Details
        </h4>
        {/* <div className="row" data-testid="innerdiv">
          {data.map((item) => (
            <Card
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
            status={props.loggedStatus}
            />
          ))}
        </div> */}
        <div>
        <DisplayCard
          key={uuidv4()}
          name = {user.name}
          age = {user.age}
          phone = {user.phone}
          password={user.password}
          email = {user.email}
          address = {user.address}
          image = {img}
          // image = {user.image}
        />
        </div>
      </div>
    </div>
  );
}
