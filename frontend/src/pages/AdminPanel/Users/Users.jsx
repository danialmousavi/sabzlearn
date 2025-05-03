import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2';

export default function Users() {
  const [users, setUsers] = useState([]);
  //fetch users from api
  const fetchUsers=()=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'))
    
    fetch("http://localhost:3000/v1/users",{
      headers:{
        "Authorization":`Bearer ${localStorageData}`
      }
    }).then(res=>res.json()).then(data=>{
      setUsers(data);

    }
    )
  }
  useEffect(()=>{
      fetchUsers();
  },[])
  //delete user function
  const DeleteUser=(id)=>{
        Swal.fire({
          title: "حذف کاربر",
          text: "آیا مطمئن هستید؟",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "خیر",
          confirmButtonText:'بله'
        }).then((result)=>{
            if(result.isConfirmed){
              const localStorageData=JSON.parse(localStorage.getItem('user'))
              fetch(`http://localhost:3000/v1/users/${id}`,{
                method:"DELETE",
                headers:{
                  "Authorization":`Bearer ${localStorageData}`
                }
              }).then(res=>{
                  if(res.ok){
                    Swal.fire({
                      title: "تبریک",
                      text: "کاربر با موفقیت حذف شد",
                      icon: "success",
                      confirmButtonText:'تایید'
                    });
                    fetchUsers();
                  } else {
                    Swal.fire({
                      title: "متاسفیم ",
                      text: "کاربر حذف نشد",
                      icon: "error",
                      confirmButtonText:'تایید'
                    });
                  }
              }).catch(() => {
                Swal.fire({
                  title: "متاسفیم ",
                  text: "خطایی رخ داد",
                  icon: "error",
                  confirmButtonText:'تایید'
                });
              })
              
            }
        })
  }
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
                <button type="button" class="btn btn-danger delete-btn" onClick={()=>DeleteUser(user._id)}>
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
