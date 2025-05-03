import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'

export default function Users() {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'))
    
    fetch("http://localhost:3000/v1/users",{
      headers:{
        "Authorization":`Bearer ${localStorageData}`
      }
    }).then(res=>res.json()).then(data=>{
      setUsers(data);
      console.log(data);
      
    }
    )
  },[])
  return (
    <DataTable title="کاربران">
              <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی </th>
              <th>ایمیل</th>
            </tr>
          </thead>
          <tbody>
            {users&&users.map((user,index)=>(
            <tr>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn">
                  حذف
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn">
                  بن
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
    </DataTable>
  )
}
