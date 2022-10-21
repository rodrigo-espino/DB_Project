
import {Login} from './pages/login'
import {Rooms} from './pages/rooms'
import {Classes} from './pages/classes'
import {Instructors} from './pages/instructors'
import {Members} from './pages/members'
import {Squash} from './pages/squash'
import {Devices} from './pages/devices'
import {Dashboard} from './pages/Dashboard'
import { Routes, Route } from "react-router-dom";
import { Users } from './pages/users'
import { ProtectedRoute, Verify } from './components/ProtectedRoute'
import Cookies from 'js-cookie'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
    <ToastContainer/>
     <Routes>
    
      <Route element={<Verify c = {Cookies.get('Session')}/>}> 
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login/>}/>
      </Route>

      <Route element={<ProtectedRoute c = {Cookies.get('Session')}/>}>
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="/classes" element={<Classes/>}/>
        <Route path="/intructors" element={<Instructors/>}/>
        <Route path="/members" element={<Members/>}/>
        <Route path="/squash" element={<Squash/>}/>
        <Route path="/devices" element={<Devices/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
      </Route>
      
     </Routes>
    </>
  );
}

export default App;