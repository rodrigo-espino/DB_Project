import React, { useState } from "react";
import Cookies from "js-cookie";
import { API } from "../components/API";
import { toast } from "react-toastify";
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
      setError("Hola");
      toast(error, { type: "error" });
    }
  };

  return (
    <>
      <div className="text-center py-5">
        <main className="form-signin w-50 m-auto">
          <form onSubmit={handleSignIn}>
            <img
              className="mb-4"
              src="../assets/brand/bootstrap-logo.svg"
              alt=""
              width="72"
              height="57"
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
            <input
            type="text"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            className="form-control"
            placeholder="User"
            autoFocus
          />
              <br />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
            <input
            type="password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            className="form-control"
            placeholder="Password"
          />
              <br />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary">
              Sign in
            </button>
        
          </form>
        </main>
      </div>
    </>
  );
}
