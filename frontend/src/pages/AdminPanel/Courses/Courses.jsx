import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'

export default function Courses() {
  const [Courses,setCourses]=useState([]);
  useEffect(()=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:3000/v1/courses',{
      headers:{
        "Authorization":`Bearer ${localStorageData}`
      }
    }).then((res)=>res.json()).then(data=>setCourses(data))
  },[])
  console.log(Courses);
  
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
            <tr>
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
                <button type="button" class="btn btn-danger delete-btn" >
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
