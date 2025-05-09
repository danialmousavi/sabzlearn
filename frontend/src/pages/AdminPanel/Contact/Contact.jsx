import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2';

export default function Contact() {
    const [contacts,setContacts]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/v1/contact').then(res=>res.json()).then(data=>{
            console.log(data);
            setContacts(data);
        })
    },[])
    // Function to show the contact body in a modal or alert
    const showConatactBody=(body)=>{
        Swal.fire({
            title: body,
            confirmButtonText: 'بستن'
        })
    }
  return (
    <>
     <DataTable title="پیغام ها">
     <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {contacts&&contacts.map((contact,index)=>(
            <tr key={contact._id}>
              <td>{index+1}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn" onClick={()=>showConatactBody(contact.body)}>
                  مشاهده
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn"  >
                  حذف
                </button>
              </td>

            </tr>
            ))}
          </tbody>
        </table>
     </DataTable>
    </>
  )
}
