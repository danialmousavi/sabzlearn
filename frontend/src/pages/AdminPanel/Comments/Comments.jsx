import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2';

export default function Comments() {
    const [comments,setComments]=useState([]);
    const getAllComments=()=>{
                fetch('http://localhost:3000/v1/comments').then(res=>res.json()).then(data=>{
            console.log(data);
            setComments(data);
        }
        )
    }
    //get all comments of courses
    useEffect(()=>{
        getAllComments();
    },[])
  //delete comment  
    const deleteComment=(commentID)=>{
 const localStorageData = JSON.parse(localStorage.getItem("user"));
    Swal.fire({
      title: "حذف دوره",
      text: "آیا مطمئن هستید که میخواهید این کامنت را حذف کنید؟",
      icon: "warning",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/v1/comments/${commentID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData}`,
          },
        }).then((res) => {
          if (res.ok) {
            Swal.fire({
              title: "تبریک",
              text: "کامنت با موفقیت حذف شد",
              icon: "success",
            }).then(() => {
              getAllComments();
            });
          } else {
            Swal.fire({
              title: "متاسفیم",
              text: "کامنت حذف نشد",
              icon: "error",
            });
          }
        });
      }
    });
    }
    //showComment in swal
    const showComment=(commentBody)=>{
      Swal.fire({
        title:commentBody,
        confirmButtonText:"بستن"
      })
    }
    //ban user commented 
    const banUser=(id)=>{
       const localStorageData=JSON.parse(localStorage.getItem('user'))
          Swal.fire({
              title: "بن کاربر",
              text: "آیا مطمئن هستید؟",
              icon: "warning",
              showCancelButton: true,
              cancelButtonText: "خیر",
              confirmButtonText:'بله'
          }).then(result=>{
            if(result.isConfirmed){
              fetch(`http://localhost:3000/v1/users/ban/${id}`,{
                method:"PUT",
                headers:{
                  "Authorization":`Bearer ${localStorageData}`
                }
              }).then(res=>{
                if(res.ok){
                  Swal.fire({
                    title: "تبریک",
                    text: "کاربر با موفقیت بن شد",
                    icon: "success",
                    confirmButtonText:'تایید'
                  });
                } else {
                  Swal.fire({
                    title: "متاسفیم ",
                    text: "کاربر بن نشد",
                    icon: "error",
                    confirmButtonText:'تایید'
                  });
                }
          
              })
            }
          })
    }
    //answer comment
    const answerComment=(commentID)=>{
       const localStorageData=JSON.parse(localStorage.getItem("user"));
            
            Swal.fire({
              title:"پاسخ به کاربر",
              input: "text",
              inputPlaceholder: "پاسخ خود را بنویسید",
              showCancelButton:true,
              cancelButtonText:"کنسل",
              showConfirmButton:true,
              confirmButtonText:"تایید"
            }).then(result=>{
                if(result.isConfirmed){
              const answerToUser={
                body:result.value
              }
              fetch(`http://localhost:3000/v1/comments/answer/${commentID}`,{
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
                  getAllComments();
                }else{
                  Swal.fire({
                    title:"متاسفیم پیام شماارسال نشد",
                    icon:"error"
                  })
                }
              })
                }
            })
    }
    //accept comment
        const acceptComment=(commentID)=>{
       const localStorageData=JSON.parse(localStorage.getItem("user"));
            
            Swal.fire({
              title:"تایید به کامنت",
              text:"آیا اطمینان دارید؟",
              showCancelButton:true,
              cancelButtonText:"کنسل",
              showConfirmButton:true,
              confirmButtonText:"تایید"
            }).then(result=>{
                if(result.isConfirmed){
              fetch(`http://localhost:3000/v1/comments/accept/${commentID}`,{
                method:"PUT",
                headers:{
                  Authorization:`Bearer ${localStorageData}`
                },
              }).then(res=>{
                if(res.ok){
                  Swal.fire({
                    title:"کامنت تایید شد!",
                    icon:"success"
                  })
                  getAllComments();
                }else{
                  Swal.fire({
                    title:"متاسفیم کامنت تایید نشد",
                    icon:"error"
                  })
                }
              })
                }
            })
    }
    //reject comment
    const rejectComment=(commentID)=>{
       const localStorageData=JSON.parse(localStorage.getItem("user"));
            Swal.fire({
              title:" رد کامنت",
              text:"آیا اطمینان دارید؟",
              showCancelButton:true,
              cancelButtonText:"کنسل",
              showConfirmButton:true,
              confirmButtonText:"تایید"
            }).then(result=>{
                if(result.isConfirmed){
              fetch(`http://localhost:3000/v1/comments/reject/${commentID}`,{
                method:"PUT",
                headers:{
                  Authorization:`Bearer ${localStorageData}`
                },
              }).then(res=>{
                if(res.ok){
                  Swal.fire({
                    title:"کامنت رد شد!",
                    icon:"success"
                  })
                  getAllComments();
                }else{
                  Swal.fire({
                    title:"متاسفیم کامنت رد نشد",
                    icon:"error"
                  })
                }
              })
                }
            })
    }
  return (
    <>
          <DataTable title="منوها">
            <table class="table">
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>کاربر</th>
                  <th>دوره</th>
                  <th>امتیاز</th>
                  <th>مشاهده</th>
                  <th>پاسخ</th>
                  <th>ویرایش</th>
                  <th>تایید</th>
                  <th>حذف</th>
                  <th>بن</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment, index) => (
                  <tr>
                    <td className={comment.answer==1?"answerd-comment":"not-answerd-comment"}>{index + 1}</td>
                    <td>{comment.creator.name}</td>
                    <td>{comment.course}</td>
                    <td>
                      {Array(5-comment.score).fill(0).map((item,index)=>(<img key={index} src={`/images/svgs/star.svg`}/>))}
                      {Array(comment.score).fill(0).map((item,index)=>(<img key={index} src={`/images/svgs/star_fill.svg`}/>))}
                      </td>
                    <td>
                    <button type="button" class="btn btn-primary edit-btn" onClick={()=>showComment(comment.body)}>
                        مشاهده
                      </button>
                    </td>

                    <td>
                      <button type="button" class="btn btn-primary edit-btn" onClick={()=>answerComment(comment._id)}>
                        پاسخ
                      </button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-primary edit-btn">
                        ویرایش
                      </button>
                    </td>
                    {comment.answer==1?(
                      <>
                    <td>
                      <button type="button" class="btn btn-primary edit-btn" onClick={()=>rejectComment(comment._id)}>
                        رد
                      </button>
                    </td>
                      </>
                    ):(
                      <>
                    <td>
                      <button type="button" class="btn btn-primary edit-btn" onClick={()=>acceptComment(comment._id)}>
                        تایید
                      </button>
                    </td>
                      </>
                    )}
                    <td>
                      <button type="button" class="btn btn-danger delete-btn" onClick={()=>deleteComment(comment._id)} >
                        حذف
                      </button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-danger delete-btn" onClick={()=>banUser(comment.creator._id)} >
                        بن
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
