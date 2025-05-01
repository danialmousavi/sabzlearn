import React, { useEffect, useState } from "react";
import "./CategoryInfo.css";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";
import { Link, useParams } from "react-router";
export default function CategoryInfo() {
  const { categoryName } = useParams();
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  const [status, setStatus] = useState("default");
  const [orderdCourses, setOrderedCourses] = useState([]);
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض");
  const [searchValue, setSearchValue] = useState("");
  const [coursTypeDisplay, setCourseTypeDisplay] = useState("row");
  useEffect(() => {
    fetch(`http://localhost:3000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, [categoryName]);
  useEffect(() => {
    switch (status) {
      case "free": {
        setOrderedCourses(courses.filter((course) => course.price === 0));
        break;
      }
      case "money": {
        setOrderedCourses(courses.filter((course) => course.price !== 0));
        break;
      }
      case "latest": {
        setOrderedCourses(courses);
        break;
      }
      case "avalin": {
        const reversedCourses = courses.slice().reverse();
        setOrderedCourses(reversedCourses);
        break;
      }

      default: {
        setOrderedCourses(courses);
        break;
      }
    }
  }, [status]);
  useEffect(() => {
    setShownCourses(courses); // Show the first 3 courses by default
    setOrderedCourses(courses); // Set the ordered courses to the full list initially
  }, [courses]);
  const handleStausTitle = (e) => {
    setStatusTitle(e.target.innerText);
  };
  // useEffect(()=>{
  // if(searchValue.length>0){
  //   const filteredCourses=orderdCourses.filter(course=>course.name.toLowerCase().includes(searchValue.toLowerCase()));
  //   setShownCourses(filteredCourses);
  // }else{
  //   setShownCourses(orderdCourses);
  // }
  // }, [searchValue]);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    const filteredCourses = orderdCourses.filter((course) =>
      course.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setShownCourses(filteredCourses);
  };
  return (
    <>
      <Topbar />
      <Navbar />
      <section className="courses">
        <div className="container">
          <div className="courses-top-bar">
            <div className="courses-top-bar__right">
              <div
                className={`courses-top-bar__row-btn ${
                  coursTypeDisplay == "row"
                    ? "courses-top-bar__icon--active"
                    : ""
                }`}
                onClick={() => setCourseTypeDisplay("row")}
              >
                <i className="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div
                className={`courses-top-bar__column-btn ${
                  coursTypeDisplay == "column"
                    ? "courses-top-bar__icon--active"
                    : ""
                }`}
                onClick={() => setCourseTypeDisplay("column")}
              >
                <i className="fas fa-align-left courses-top-bar__icon"></i>
              </div>

              <div className="courses-top-bar__selection">
                <span className="courses-top-bar__selection-title">
                  {statusTitle}
                  <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul className="courses-top-bar__selection-list">
                  <li
                    className="courses-top-bar__selection-item courses-top-bar__selection-item--active"
                    onClick={(e) => {
                      setStatus("default");
                      handleStausTitle(e);
                    }}
                  >
                    مرتب سازی پیش فرض
                  </li>
                  <li
                    className="courses-top-bar__selection-item"
                    onClick={(e) => {
                      setStatus("free");
                      handleStausTitle(e);
                    }}
                  >
                    مربت سازی دوره های رایگان
                  </li>
                  <li
                    className="courses-top-bar__selection-item"
                    onClick={(e) => {
                      setStatus("money");
                      handleStausTitle(e);
                    }}
                  >
                    مربت سازی بر دوره های پولی
                  </li>
                  <li
                    className="courses-top-bar__selection-item"
                    onClick={(e) => {
                      setStatus("latest");
                      handleStausTitle(e);
                    }}
                  >
                    مربت سازی بر اساس آخرین
                  </li>
                  <li
                    className="courses-top-bar__selection-item"
                    onClick={(e) => {
                      setStatus("avalin");
                      handleStausTitle(e);
                    }}
                  >
                    مربت سازی بر اساس اولین
                  </li>
                </ul>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                  onChange={handleSearch}
                />
                <i className="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>
          </div>
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownCourses.length === 0 ? (
                  <>
                    <div className="alert alert-warning">
                      هیچ دوره ای برای این دسته بندی وجود ندارد
                    </div>
                  </>
                ) : (
                  <>
                    {coursTypeDisplay == "row" ? (
                      <>
                        {shownCourses.map((course) => (
                          <CourseBox {...course} />
                        ))}
                      </>
                    ) : (
                      <>
                        {shownCourses.map((course) => (
                          <div class="col-12">
                            <div class="course-box">
                              <div class="course__box-header">
                                <div class="course__box-right">
                                  <Link
                                    class="course__box-right-link"
                                    to={`/course-info/${course.shortName}`}
                                  >
                                    <img
                                      src={course.cover}
                                      class="course__box-right-img"
                                    />
                                  </Link>
                                </div>
                                <div class="course__box-left">
                                  <div class="course__box-left-top">
                                    <Link
                                      to={`/course-info/${course.shortName}`}
                                      class="course__box-left-link"
                                    >
                                      {course.name}
                                    </Link>
                                  </div>
                                  <div class="course__box-left-center">
                                    <div class="course__box-left-teacher">
                                      <i class="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                      <span class="course__box-left-name">
                                        محمد امین سعیدی راد
                                      </span>
                                    </div>
                                    <div class="course__box-left-stars">
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                      <span class="course__box-left-star">
                                        <img src="/images/svgs/star_fill.svg" />
                                      </span>
                                    </div>
                                  </div>
                                  <div class="course__box-left-bottom">
                                    <div class="course__box-left-des">
                                      <p>{course.description}</p>
                                    </div>
                                  </div>
                                  <div class="course__box-footer">
                                    <div class="course__box-footer-right">
                                      <i class="course__box-footer-icon fa fa-users"></i>
                                      <span class="course__box-footer-count">
                                        202
                                      </span>
                                    </div>
                                    <span class="course__box-footer-left">
                                      {course.price === 0
                                        ? "رایگان"
                                        : course.price.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Pagination
          items={orderdCourses}
          itemCount={3}
          pathName={`/category-info/${categoryName}`}
          setShownCourses={setShownCourses}
        />
      </section>
      <Footer />
    </>
  );
}
