import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2';

export default function Courses() {
  const [Courses,setCourses]=useState([]);
  const getAllCourses=()=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:3000/v1/courses',{
      headers:{
        "Authorization":`Bearer ${localStorageData}`
      }
    }).then((res)=>res.json()).then(data=>setCourses(data))
  }
  useEffect(()=>{
    getAllCourses();
  },[])
  console.log(Courses);
    //delete category
    const deleteCourse=(id)=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'));
      Swal.fire({
      title: "حذف دوره",
      text: "آیا مطمئن هستید که میخواهید این دوره را حذف کنید؟",
      icon: "warning",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton: true,   
      }).then((result) => {
        if(result.isConfirmed){
          fetch(`http://localhost:3000/v1/courses/${id}`,{
            method:"DELETE",
            headers:{
              "Authorization":`Bearer ${localStorageData}`
            }
          }).then(res=>{
            if(res.ok){
              Swal.fire({
                title:"تبریک",
                text:"دوره با موفقیت حذف شد",
                icon:"success",
              })
              .then(()=>{
                getAllCourses();
              })
            }else{
              Swal.fire({
                title:"متاسفیم",
                text:"دوره حذف نشد",
                icon:"error",
              })
            }
          })
        }
      })
    }

  return (
    <>
        <DataTable title="دوره ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>دسته بندی</th>
              <th>مبلغ</th>
              <th>وضعیت برگذاری</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {Courses&&Courses.map((course,index)=>(
            <tr key={course._id}>
              <td>{index+1}</td>
              <td>{course.name}</td>
              <td>{course.categoryID}</td>
              <td>{course.price==0?'رایگان':course.price}</td>
              <td>{course.isComplete?"تکمیل شده":"درحال برگذاری"}</td>
              <td>{course.shortName}</td>
              <td>{course.creator}</td>

              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={()=>deleteCourse(course._id)} >
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
