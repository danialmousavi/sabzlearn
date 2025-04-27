import React, { useEffect, useState } from 'react'
import './Courses.css'
import Topbar from '../../components/Topbar/Topbar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import CourseBox from '../../components/CourseBox/CourseBox'
import Pagination from '../../components/Pagination/Pagination'
export default function Courses() {
    const [courses,setCourses]=useState([]);
    const [shownCourses,setShownCourses]=useState([]);  
    useEffect(()=>{
      fetch('http://localhost:3000/v1/courses').then(res=>res.json()).then(data=>setCourses(data)
      )
    },[])
  return (
    <>
    <Topbar/>
    <Navbar/>
    <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "دوره ها",
            to: "courses",
          },
        ]}
      />    
          <section className="courses">
            <div className="container">
              <div className="courses-content">
                <div className="container">
                  <div className="row">
                    {shownCourses.map(course=>(
                    <CourseBox {...course}/>
                    ))}
                  </div>
                </div>
              </div>
                  <Pagination
                    items={courses}
                    itemCount={6}
                    pathName="/courses"
                    setShownCourses={setShownCourses}
                  />
            </div>
          </section>
          {/* <!--------------------------------  Courses-Section  --------------------------------> */}
    <Footer/>
    </>
)
}
