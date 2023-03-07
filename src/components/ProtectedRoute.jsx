import { Navigate,Outlet } from "react-router-dom";
import {useContext} from 'react'
import { AppContext } from "../context/AppContext";

export const ProtectedRoute = ({children,redirecTo="/"}) => {

  const {usuario} = useContext(AppContext);
  const sesion = window.localStorage.getItem('sesion');
  
  if(!sesion){
    console.log('no hay sesion');
    return <Navigate to={redirecTo}/>
  }else{
    console.log('hay sesion')
    return children? children : <Outlet/>
  }
}
