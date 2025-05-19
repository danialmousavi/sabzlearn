import React from 'react'
import Topbar from '../../components/Topbar/Topbar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Sidebar from '../../components/UserPanel/Sidebar'
import { Outlet } from 'react-router'
import './Index.css'
export default function Index() {
  return (
    <>
    <Topbar/>
    <Navbar/>
            <section class="content">
            <div class="content-header">
                <div class="container">
                    <span class="content-header__title">حساب کاربری من</span>
                    <span class="content-header__subtitle">پیشخوان</span>
                </div>
            </div>
            <div class="content-main">
                <div class="container">
                    <div class="row">
                        <Sidebar />
    
                        <Outlet />
    
                    </div>
                </div>
            </div>
        </section>
    <Footer/>
    </>
  )
}
