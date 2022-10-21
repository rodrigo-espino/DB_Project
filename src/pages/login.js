import React, { useState } from "react";
import Cookies from "js-cookie";
import { API } from "../components/API";

export function Login() {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/login/${user}/${pass}`);
    const data = await res.json();
    console.log(data);

    if (data.msg === "Ok") {
      Cookies.set("Session", user);
      window.location.reload();
    } else {
      setError(data.msg);
    }
  };

  return (
    <>
      {error ? (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div></div>
      )}
      <form onSubmit={handleSignIn} className="card card-body">
        <div className="form-group">
          <input
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            className="form-control"
            placeholder="User"
            autoFocus
          />
          <br />
        </div>
        <div className="form-group">
          <input
            type="password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            className="form-control"
            placeholder="Password"
          />
          <br />
        </div>

        <button className="btn btn-primary btn-block">Sign In</button>
      </form>
    </>
  );
}
