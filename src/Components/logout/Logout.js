import React from "react";
import { Redirect } from "react-router-dom";
export default function Logout(props) {
  props.logoutStatus(false);
  return (
    <div>
      {localStorage.removeItem("token")}
      {localStorage.removeItem("userName")}
      {localStorage.removeItem('email')}
      <Redirect to="/"></Redirect>
    </div>
  );
}
