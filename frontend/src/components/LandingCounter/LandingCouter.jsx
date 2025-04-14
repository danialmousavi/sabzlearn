import React, { useEffect, useState } from 'react'

export default function LandingCouter({landCouter}) {
       const [couter,setCounter]=useState(0);
       useEffect(()=>{
        let interval=setInterval(() => {
          setCounter(prevCount=>prevCount+1);
        }, 1);
        if(couter===landCouter){
          clearInterval(interval)
        }
        return()=>clearInterval(interval)
       },[couter])
  return (
        <span class="landing-status__count">{couter}</span>
  )
}
