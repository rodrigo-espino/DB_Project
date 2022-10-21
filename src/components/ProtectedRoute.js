import {Navigate, Outlet} from 'react-router-dom'
import { Layout } from './Layout'
export function ProtectedRoute({c, children}) {
    if(!c){
        return<Navigate to="/"/>
    } 
    return (
        <>
        <Layout/>
        <Outlet/>
        </>
    )
}

export function Verify({c, children}) {
    if(c){
        return<Navigate to="/dashboard"/>
    } 
    return <Outlet/>
}