import styles from "./User.module.css";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



function User() {
  const navigate = useNavigate();
  const { logout, isLogIn,user } = useContext(AuthContext);

  function handleClick(e) {
    e.preventDefault();
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={(e) => handleClick(e)}>Logout</button>
    </div>
  );
}

export default User;

