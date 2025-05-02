import React from 'react'
import'./Sidebar.css'
import {Link} from 'react-router-dom'
export default function Sidebar() {
  return (
    <div id="sidebar" class="col-2">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <a href="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </a>
        </div>

        <div class="sidebar-menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li class="active-menu">
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
