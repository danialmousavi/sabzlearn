import React, { useContext } from 'react'
import AuthContext from '../../../context/authContext'
import IndexBox from '../../../components/UserPanel/IndexBox/IndexBox'

export default function Index() {
    const authContext =useContext(AuthContext)
  return (
    <div class="col-9">
      <div class="main">
        <div class="main__title">
          <span class="main__title-text">
            سلام{" "}
            <span class="main__title-name">{authContext.userInfo&&authContext.userInfo.name}</span>،
            به پنل کاربری خوش اومدی
          </span>
        </div>
        <p class="main__desc">
          از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
          مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
          کاربری و کلمه عبور خود را ویرایش کنید.
        </p>
        <div class="main__links">
          <div class="row">
            <IndexBox title="سفارش" href="orders" />
            <IndexBox title="دوره های خریداری شده" href="buyed" />
            <IndexBox title="کیف پول من" href="money" />
            <IndexBox title="جزئیات حساب کاربری" href="edit-account" />
            <IndexBox title="تیکت های پشتیبانی" href="ticket" />
          </div>
        </div>
      </div>
    </div>
  )
}
