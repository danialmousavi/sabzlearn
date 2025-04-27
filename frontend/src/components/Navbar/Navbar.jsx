import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import AuthContext from "../../context/authContext";
import { Link } from "react-router";
export default function Navbar() {
  const authContext = useContext(AuthContext);
  const [getAllNavbars,setGetAllNavbars]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/v1/menus').then(res=>res.json()).then(data=>setGetAllNavbars(data)
    )
  },[])
  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>
              {getAllNavbars.map(link=>(
              <li className="main-header__item" key={link._id}>
                <Link to={`${link.href}/1` } className="main-header__link">
                  {link.title}
                  {link.submenus.length!=0&&(
                <>
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    {link.submenus.map(sub=>(
                    <li className="main-header__dropdown-item" key={sub._id}>
                      <Link to={sub.href} className="main-header__dropdown-link">
                       {sub.title}
                      </Link>
                    </li>
                    ))}
                  </ul>
                    </>
                  )}
              </Link>
              </li>
              ))}
              {/* <li className="main-header__item">
                <a href="#" className="main-header__link">
                  فرانت اند
                  <i className="fas fa-angle-down main-header__link-icon"></i>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش Html
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش Css
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش جاوا اسکریپت
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش FlexBox
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش جامع ری‌اکت
                      </a>
                    </li>
                  </ul>
                </a>
              </li> */}
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>
            {authContext.isLoggedIn ? (
              <a href="#" className="main-header__profile">
                <span className="main-header__profile-text">{authContext.userInfo.name}</span>
              </a>
            ) : (
              <Link to='/login' className="main-header__profile">
                <span className="main-header__profile-text">ورود / ثبت‌ نام</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
