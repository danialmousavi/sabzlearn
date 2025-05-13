import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Topbar from '../../components/Topbar/Topbar'
import { useParams } from 'react-router'

export default function Session() {
    const{courseName,sessionId}=useParams();
    useEffect(()=>{
        const localStorageData=JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:3000/v1/${courseName}/${sessionId}`,{
            headers:{
                Authorization:`Bearer ${localStorageData}`
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            
        })
    },[])
  return (
    <>
        <Topbar/>
        <Navbar/>
        <Footer/>
    </>
  )
}
