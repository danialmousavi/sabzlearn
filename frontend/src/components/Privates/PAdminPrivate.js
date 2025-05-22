import React, { useContext } from 'react'
import AuthContext from '../../context/authContext'
import { useNavigate } from 'react-router';

export default function PAdminPrivate({children}) {
    const authContext=useContext(AuthContext);
    const navigate=useNavigate();
    console.log(authContext.userInfo);
    
  return (
    <>
    {authContext.userInfo&&authContext.userInfo.role==="ADMIN"?<>{children}</>:navigate('/login')}
    </>
  )
}
