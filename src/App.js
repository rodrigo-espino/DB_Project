
import {Login} from './pages/login'
import {Rooms} from './pages/rooms'
import {Classes} from './pages/classes'
import {Instructors} from './pages/instructors'
import {Assigned} from './pages/assigned'
import {Attends} from './pages/attends'
import {Members} from './pages/members'
import {Reservation} from './pages/reservation'
import {Squash} from './pages/squash'
import {Devices} from './pages/devices'
import { Routes, Route } from "react-router-dom";

import { ProtectedRoute } from './components/ProtectedRoute'
import Cookies from 'js-cookie'

function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login/>}/>

      <Route element={<ProtectedRoute c = {Cookies.get('Session')}/>}>
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="/classes" element={<Classes/>}/>
        <Route path="/intructors" element={<Instructors/>}/>
        <Route path="/assigned" element={<Assigned/>}/>
        <Route path="/attends" element={<Attends/>}/>
        <Route path="/members" element={<Members/>}/>
        <Route path="/reservation" element={<Reservation/>}/>
        <Route path="/squash" element={<Squash/>}/>
        <Route path="/devices" element={<Devices/>}/>
      </Route>
      
     </Routes>
    </>
  );
}

export default App;
