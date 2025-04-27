import React, { children, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Authentication({ children }) {
  const { isLogIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isLogIn) {
        navigate("/");
      }
    },
    [isLogIn, navigate]
  );
  return isLogIn? children:null;
}
