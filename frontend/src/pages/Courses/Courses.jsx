import React from 'react'
import './Courses.css'
import Topbar from '../../components/Topbar/Topbar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import CourseBox from '../../components/CourseBox/CourseBox'
export default function Courses() {
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
                    <CourseBox />
                    <CourseBox />
                    <CourseBox />
                    <CourseBox />
                    <CourseBox />
                    <CourseBox />
                    <CourseBox />
                    <CourseBox />
                  </div>
                </div>
              </div>
    
              <div className="courses-pagination">
                <ul className="courses__pagination-list">
                  <li className="courses__pagination-item">
                    <a href="#" className="courses__pagination-link">
                      <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
                    </a>
                  </li>
                  <li className="courses__pagination-item">
                    <a
                      href="#"
                      className="courses__pagination-link courses__pagination-link--active"
                    >
                      1
                    </a>
                  </li>
                  <li className="courses__pagination-item">
                    <a href="#" className="courses__pagination-link">
                      2
                    </a>
                  </li>
                  <li className="courses__pagination-item">
                    <a href="#" className="courses__pagination-link">
                      3
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          {/* <!--------------------------------  Courses-Section  --------------------------------> */}
    <Footer/>
    </>
)
}
