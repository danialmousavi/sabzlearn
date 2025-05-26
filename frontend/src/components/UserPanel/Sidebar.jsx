import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import AuthContext from '../../context/authContext';

export default function Sidebar() {
    const authContext=useContext(AuthContext);
    const navigate=useNavigate();
    const logOut=(e)=>{
        e.preventDefault();
        Swal.fire({
            title:"آیا میخواهید از حساب کاربری خود خارج شوید؟",
            icon:"question",
            showConfirmButton:true,
            confirmButtonText:"بله",
            showCancelButton:true,
            cancelButtonText:"خیر"
        }).then(result=>{
            if(result.isConfirmed){
                authContext.logOut();
                Swal.fire({
                    title:"با موفقیت خارج شدید",
                    icon:"success"
                }).then(()=>{
                    navigate("/");
                })
            }
        })
    }
  return (
    <div class="col-3">
      <div class="sidebar">
        <ul class="sidebar__list">
          <li class="sidebar__item">
            <Link class="sidebar__link" to="/my-account">
              پیشخوان
            </Link>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="/my-account/orders">
              سفارش‌ها
            </Link>
          </li>
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              کیف پول من
            </a>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="/my-account/edit-account">
              جزئیات حساب کاربری
            </Link>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="/my-account/buyed">
              دوره های خریداری شده
            </Link>
          </li>
          <li class="sidebar__item">
            <Link class="sidebar__link" to="/my-account/tickets">
              تیکت های پشتیبانی
            </Link>
          </li>
          <li class="sidebar__item" onClick={logOut}>
            <a class="sidebar__link" href="#">
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
