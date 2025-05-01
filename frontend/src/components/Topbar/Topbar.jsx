import React, { memo, useEffect, useState } from 'react'
import'./Topbar.css'
import {Link} from"react-router"
  function Topbar() {
  const [getAllTopbars,setGetAllTopbars]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/v1/menus/topbar').then(res=>res.json()).then(data=>setGetAllTopbars(data))
  },[])
  const generateRandomTopbars=(arr,randomCount)=>{
    //مرتب‌سازی تصادفی آرایه با استفاده از مقداردهی تصادفی در تابع مقایس
    const shuffeld=[...arr].sort(()=>0.5-Math.random());
    //انتخاب و بازگرداندن تعداد مشخصی از آیتم‌های تصادفی از ابتدای آرایه
    return shuffeld.slice(0,randomCount);
  }
  
  return (
    <div className="top-bar">
    <div className="container-fluid">
      <div className="top-bar__content">
        <div className="top-bar__right">
          <ul className="top-bar__menu">
            {generateRandomTopbars(getAllTopbars,5).map(link=>(
              <Link to={link.href} className="top-bar__item" key={link._id}>
                <a href="#" className="top-bar__link">{link.title}</a>
              </Link>
            ))}
          </ul>
        </div>
        <div className="top-bar__left">
          <div className="top-bar__email">
            <a href="#" className="top-bar__email-text top-bar__link">
              sabzlearn@gmail.com
            </a>
            <i className="fas fa-envelope top-bar__email-icon"></i>
          </div>
          <div className="top-bar__phone">
            <a href="#" className="top-bar__phone-text top-bar__link">
              09921558293
            </a>
            <i className="fas fa-phone top-bar__phone-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default memo(Topbar);