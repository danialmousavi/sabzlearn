import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2';
import './Courses.css'
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
    //CREATE COURSE
    //get categories for selecting category
    const [categories,setCategories]=useState([]);
    useEffect(()=>{
      fetch("http://localhost:3000/v1/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        console.log(data);
      });
    })
    const selectCategory=()=>{

    }
  return (
    <>
          <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن محصول جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا نام محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">تعداد محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا تعداد محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <input
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس محصول</label>
                <input type="file" id="file" />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">موجودی</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>موجود</span>
                        <input
                          type="radio"
                          value="avalibe"
                          name="condition"
                          checked
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>ناموجود</span>
                        <input
                          type="radio"
                          value="unavailable"
                          name="condition"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="presell">
                <label class="input-title">وضعیت دوره</label>
                <div class="radios">
                  <div class="presell-true">
                    <label>
                      <span>پیش فروش</span>
                      <input
                        type="radio"
                        value="presell"
                        name="presell"
                        checked
                      />
                    </label>
                  </div>
                  <div class="presell-false">
                    <label>
                      <span>در حال برگزاری</span>
                      <input type="radio" value="onperforming" name="presell" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
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
