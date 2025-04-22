import { createContext } from "react";
const AuthContext=createContext({
    isLoggedIn:false,
    token:null,
    userInfo:null,
    login:()=>{},
    logOut:()=>{}
})
export default AuthContext