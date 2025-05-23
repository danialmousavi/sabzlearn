import React, { useState } from "react";
import "./LastCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";
export default function LastCourses() {
  const [courses,setCourses]=useState([]);
  useState(()=>{
    fetch('http://localhost:3000/v1/courses').then(res=>res.json()).then(data=>{
      setCourses(data);
      console.log(data);
      
    }
    )
  },[])
  return (
    <div className="courses">
      <div className="container">
        <SectionHeader
          title="جدیدترین دوره ها"
          desc="سکوی پرتاپ شما به سمت موفقیت"
          btnTitle="تمامی دوره ها"
          btnHref='courses/1'
        />
  

        <div className="courses-content">
          <div className="container">
            <div className="row">
              {courses.slice(0,3).map(course=>(
                  <CourseBox {...course}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
