import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2';

export default function Contact() {
    const [contacts,setContacts]=useState([]);
    useEffect(()=>{
      getAllContacts();
    },[])
    const getAllContacts=()=>{
            fetch('http://localhost:3000/v1/contact').then(res=>res.json()).then(data=>{
            console.log(data);
            setContacts(data);
        })
    }
    // Function to show the contact body in a modal or alert
    const showConatactBody=(body)=>{
        Swal.fire({
            title: body,
            confirmButtonText: 'بستن'
        })
    }
    const answerContact=(contactEmail)=>{
    const localStorageData=JSON.parse(localStorage.getItem("user"));
      
      Swal.fire({
        title:"پاسخ به کاربر",
        input: "text",
        inputPlaceholder: "پاسخ خود را بنویسید",
        
      }).then(result=>{
        const answerToUser={
          email:contactEmail,
          answer:result.value
        }
        fetch('http://localhost:3000/v1/contact/answer',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorageData}`
          },
          body:JSON.stringify(answerToUser)
        }).then(res=>{
          if(res.ok){
            Swal.fire({
              title:"تبریک پیام شما با موفقیت ارسال شد",
              icon:"success"
            })
          }else{
            Swal.fire({
              title:"متاسفیم پیام شما با  ارسال نشد",
              icon:"error"
            })
          }
        })
      })
    }
    //delete contact 
    const deleteContact=(contactId)=>{
    const localStorageData=JSON.parse(localStorage.getItem("user"));
      Swal.fire({
        title:"آیا از حذف مطمن هستید؟",
        icon:"question",
        confirmButtonText:"بله",
        showConfirmButton:true,
        cancelButtonText:"خیر",
        showCancelButton:true
      }).then(result=>{
        if(result.isConfirmed){
          fetch(`http://localhost:3000/v1/contact/${contactId}`,{
            method:"DELETE",
            headers:{
               Authorization:`Bearer ${localStorageData}`,
            }
          }).then(res=>{
            if(res.ok){
              Swal.fire({
                title:"پیام با موفقیت حذف شذ",
                icon:"success"
              }).then(()=>{
                getAllContacts();
              })
            }else{
              Swal.fire({
                title:"متاسفیم پیغام حذف نشد",
                icon:"error"
              })
            }
          })
        }
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
              <th>پاسخ</th>
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
                <button type="button" class="btn btn-primary edit-btn" onClick={()=>answerContact(contact.email)}>
                  پاسخ
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn"  onClick={()=>deleteContact(contact._id)}>
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
