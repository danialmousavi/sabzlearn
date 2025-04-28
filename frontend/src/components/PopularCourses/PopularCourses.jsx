import React, { useEffect, useState } from "react";
import "./PopularCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CourseBox from "../CourseBox/CourseBox";

export default function PopularCourses() {
  const [courses,setCourses]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/v1/courses/popular').then(res=>res.json()).then(data=>setCourses(data));
    
  },[])
  return (
    <div className="popular">
      <div className="container">
        <SectionHeader title='محبوب ترین دوره ها'/>
        <div className="courses-content" style={{marginTop:'30px'}}>
          <div className="container">
            <div className="row">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                className="mySwiper"
              >
                {courses.map(course=>(
                <SwiperSlide>
                  <CourseBox {...course} isSlider={true}/>
                </SwiperSlide>

                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
