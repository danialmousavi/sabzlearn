import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div class="col-3">
      <div class="sidebar">
        <span class="sidebar__name">محمدامین سعیدی راد</span>
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
          <li class="sidebar__item">
            <a class="sidebar__link" href="#">
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
