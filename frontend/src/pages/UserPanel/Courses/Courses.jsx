import React, { useEffect, useState } from 'react'
import './Coruses.css'

export default function Courses() {
    const [courses,setCourses]=useState([])
    useEffect(()=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:3000/v1/users/courses/`,{
            headers:{
                Authorization: `Bearer ${localStorageData}`,
                     }
        }).then(res=>res.json()).then(data=>{
            // console.log(data);
            setCourses(data)
        }
        )
    },[])
    console.log(courses);
    
  return (
    <div className="col-9">
      <div className="courses">
        <div className="courses-header__panel">
          <span className="courses-header__title">دوره های ثبت نام شده</span>
          <ul className="courses-header__list">
            <li className="courses-header__item">
              <a className="courses-header__link__panel courses-header__link-active" href="#">
                همه دوره ها
              </a>
            </li>
            <li className="courses-header__item">
              <a className="courses-header__link__panel" href="#">
                دوره های رایگان
              </a>
            </li>
            <li className="courses-header__item">
              <a className="courses-header__link__panel" href="#">
                دوره های پولی
              </a>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="row">
            <div className="col-12">
                {courses.map(course=>(
            <div className="main__box">
                <div className="main__box-right">
                  <a className="main__box-img-link" href="#">
                    <img
                      className="main__box-img img-fluid"
                      src={`http://localhost:3000/courses/covers/${course.course.cover}`}
                      alt="course cover"
                    />
                  </a>
                </div>
                <div className="main__box-left">
                  <a href="#" className="main__box-title">
                    {course.course.name}
                  </a>
                  <div className="main__box-bottom">
                    <div className="main__box-all">
                      <span className="main__box-all-text">وضعیت:</span>
                      <span className="main__box-all-value">{course.course.isComplete===1?"تکمیل شده":"درحال برگذاری"}</span>
                    </div>
                    <div className="main__box-completed">
                      <span className="main__box-completed-text">مبلغ:</span>
                      <span className="main__box-completed-value">{course.course.price===0?"رایگان":course.course.price}</span>
                    </div>
                  </div>
                </div>
              </div>
                ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}