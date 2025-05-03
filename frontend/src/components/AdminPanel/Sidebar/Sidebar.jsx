import React, { useContext } from 'react'
import'./Sidebar.css'
import {Link, useNavigate} from 'react-router-dom'
import AuthContext from '../../../context/authContext'
import Swal from 'sweetalert2'
export default function Sidebar() {
  const authContext=useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout=()=>{
    Swal.fire({
      title: "خروج از حساب کاربری",
      text: "آیا مطمئن هستید؟",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "خیر",
      confirmButtonText:'بله'
    }).then(()=>{
      authContext.logOut();
      navigate('/');
    })
  }
  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active-menu">
            <Link to="/p-admin">
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/courses">
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/menus">
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/users">
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/offs">
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/categories">
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link >
              <span>خروج از حساب کاربری</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
