import React from "react";
import "./CategoryInfo.css";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";
export default function CategoryInfo() {
  return (
    <>
      <Topbar />
      <Navbar />
      <section class="courses">
        <div class="container">
          <div class="courses-top-bar">
            <div class="courses-top-bar__right">
              <div class="courses-top-bar__row-btn courses-top-bar__icon--active">
                <i class="fas fa-border-all courses-top-bar__icon"></i>
              </div>
              <div class="courses-top-bar__column-btn">
                <i class="fas fa-align-left courses-top-bar__icon"></i>
              </div>

              <div class="courses-top-bar__selection">
                <span class="courses-top-bar__selection-title">
                  مرتب سازی پیش فرض
                  <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
                </span>
                <ul class="courses-top-bar__selection-list">
                  <li class="courses-top-bar__selection-item courses-top-bar__selection-item--active">
                    مرتب سازی پیش فرض
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس محبوبیت
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس امتیاز
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس آخرین
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس ارزان ترین
                  </li>
                  <li class="courses-top-bar__selection-item">
                    مربت سازی بر اساس گران ترین
                  </li>
                </ul>
              </div>
            </div>

            <div class="courses-top-bar__left">
              <form action="#" class="courses-top-bar__form">
                <input
                  type="text"
                  class="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                />
                <i class="fas fa-search courses-top-bar__search-icon"></i>
              </form>
            </div>
          </div>
          <div class="courses-content">
            <div class="container">
              <div class="row">
                <CourseBox/>
                <CourseBox/>
                <CourseBox/>
              </div>
            </div>
          </div>
        </div>
        <Pagination/>
      </section>
      <Footer />
    </>
  );
}
