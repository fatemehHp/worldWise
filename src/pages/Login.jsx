import styles from "./Login.module.css";
import PageNav from "../component/PageNav";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { CheckUserLogin, isLogIn } = useContext(AuthContext);
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  function handelLogin(email, password, e) {
    e.preventDefault();
    if (email && password) {
      CheckUserLogin(email, password);
    }
  }
  useEffect(
    function () {
      if (isLogIn) {
        navigate("/app", { replace: true });
      } 
    },
    [isLogIn, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button onClick={(e) => handelLogin(email, password, e)}>
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
