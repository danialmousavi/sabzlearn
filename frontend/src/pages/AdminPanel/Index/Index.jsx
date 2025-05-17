import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'
import'./Index.css'
import PAdminItem from '../../../components/AdminPanel/PAdminItem/PAdminItem'

export default function Index() {
    const [infos,setInfos]=useState([]);
    const[adminName,setAdminName]=useState('');
    const [lastRegisteredUsers,setLastRegisteredUsers]=useState([]);
    useEffect(()=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:3000/v1/infos/p-admin',{
        headers:{
          Authorization:`Bearer ${localStorageData}`
        }
    }).then(res=>res.json()).then(data=>{
        setInfos(data.infos);
        setAdminName(data.adminName);
        setLastRegisteredUsers(data.lastUsers);
    }
    )
},[])
  return (
       <div class="container-fluid" id="home-content">
         <div class="container">
           <div class="home-content-title">
             <span class="welcome">
               خوش آمدید,<span class="name">{adminName}</span>
             </span>
           </div>
           <div class="home-content-boxes">
             <div class="row">
               {
                  infos.map(item => (
                    <PAdminItem {...item} />
                  ))
               }
               
             </div>
           </div>
 
           <div class="home-content-latset-users">
             <DataTable title="افراد اخیرا ثبت نام شده">
 
             <table class="table">
           <thead>
             <tr>
               <th>شناسه</th>
               <th>نام و نام خانوادگی</th>
               <th>ایمیل</th>
             </tr>
           </thead>
           <tbody>
             {lastRegisteredUsers.map((user, index) => (
               <tr>
                 <td>{index + 1}</td>
                 <td>{user.name}</td>
                 {/* <td>09123443243</td> */}
                 <td>{user.email}</td>
               </tr>
             ))}
           </tbody>
         </table>
 
             </DataTable>
           </div>
         </div>
       </div>
  )
}
