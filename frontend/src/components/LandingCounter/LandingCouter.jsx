import React, { useEffect, useState } from 'react'

export default function LandingCouter({landCouter}) {
       const [couter,setCounter]=useState(0);
       useEffect(()=>{
        let interval=setInterval(() => {
          setCounter(prevCount=>prevCount+1);
        }, 10);
        if(couter===landCouter){
          clearInterval(interval)
        }
        return()=>clearInterval(interval)
       },[couter])
  return (
        <span className="landing-status__count">{couter}</span>
  )
}
