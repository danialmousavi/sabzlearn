import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../components/AdminPanel/Sidebar/Sidebar'
import './Index.css'
import Topbar from '../../components/AdminPanel/Topbar/Topbar'
export default function Index() {
  return (
    <>
        <div id='content'>
            <Sidebar/>
          <div className='col-10' id='home'>
            <Topbar/>
          </div>
        </div>
        <Outlet/>
    </>
  )
}
