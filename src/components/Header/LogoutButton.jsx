import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import {logout} from "../../store/authSlice"

const LogoutButton = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(()=>{
            dispatch(logout())
        }).catch((error)=>{
            console.log("logout Button :: logout error:: ", error);
        })
    } 

  return (
    <div>
      <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
    </div>
  )
}

export default LogoutButton
