import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../components/AdminPanel/Sidebar/Sidebar'

export default function Index() {
  return (
    <>
        <div id='content'>
            <Sidebar/>
        </div>
        <Outlet/>
    </>
  )
}
