import React from 'react'
import'./Sidebar.css'
import {Link} from 'react-router-dom'
export default function Sidebar() {
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
        </ul>
      </div>
    </div>
  )
}
