import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import AuthContext from '../../../context/authContext';
import'./EditAccount.css'
export default function EditAccount() {
    const authContext=useContext(AuthContext);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const[username,setUsername]=useState('');
    const [phone, setPhone] = useState('');
    useEffect(()=>{
        setName(authContext.userInfo&&authContext.userInfo.name);
        setEmail(authContext.userInfo&&authContext.userInfo.email);
        setUsername(authContext.userInfo&&authContext.userInfo.username);
        setPhone(authContext.userInfo&&authContext.userInfo.phone);
    },[])
  return (
    <div class="col-9">
      <div class="edit">
        <form class="edit__form" action="#">
          <div class="edit__personal">
            <div class="row">
              <div class="col-12">
                <label class="edit__label">شماره موبایل *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
                  placeholder="لطفا شماره موبایل خود را وارد کنید"
                />
              </div>
              
              <div class="col-12">
                <label class="edit__label">نام و نام خانوادگی *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
              <div class="col-12">
                <label class="edit__label">نام کاربری (نمایشی) *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
                <span class="edit__help">
                  اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                </span>
              </div>
              <div class="col-12">
                <label class="edit__label">آدرس ایمیل *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
            </div>
          </div>
          <div class="edit__password">
            <span class="edit__password-title">تغییر گذرواژه</span>
            <div class="row">
              <div class="col-12">
                <label class="edit__label">
                  گذرواژه پیشین (در صورتی که قصد تغییر ندارید خالی بگذارید)
                </label>
                <input
                  class="edit__input"
                  type="text"
                  placeholder="گذرواژه پیشین"
                />
              </div>
              <div class="col-12">
                <label class="edit__label">
                  گذرواژه جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)
                </label>
                <input
                  class="edit__input"
                  type="text"
                  placeholder="گذرواژه جدید"
                />
              </div>
              <div class="col-12">
                <label class="edit__label">تکرار گذرواژه جدید</label>
                <input
                  class="edit__input"
                  type="text"
                  placeholder="تکرار گذرواژه جدید"
                />
              </div>
            </div>
          </div>
          <button class="edit__btn" type="submit">
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </div>
  )
}
