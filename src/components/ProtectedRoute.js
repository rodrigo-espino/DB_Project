import {Navigate, Outlet} from 'react-router-dom'

export function ProtectedRoute({c, children}) {
    if(!c){
        return<Navigate to="/"/>
    } 
    return <Outlet/>
}

export function Verify({c, children}) {
    if(c){
        return<Navigate to="/rooms"/>
    } 
    return <Outlet/>
}