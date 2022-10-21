import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
export function Login() {

    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const [user, setUser] = useState('')
    
    const API = 'http://localhost:4000/api'

  const handleSignIn = async (e) =>{
    e.preventDefault()
    const res = await fetch(`${API}/login/${user}/${pass}`);
    const data = await res.json();  
    console.log(data)

    if(data.msg === 'Ok'){
      Cookies.set('Session', user)
      return <Link to="/rooms"/>
    }
    else{
      setError(data.msg)
    }

  }
  return (
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
      <br/>
    </div>
    <div className="form-group">
      <input
        type="password"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        className="form-control"
        placeholder="Password"
      />
      <br/>
    </div>
    
    
    <button className="btn btn-primary btn-block" >
      Sign In
    </button>
    
  </form>
  )
}

