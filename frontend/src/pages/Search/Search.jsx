import React, { use, useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useParams } from "react-router";
import CourseBox from "../../components/CourseBox/CourseBox";
import ArticleBox from "../../components/ArticleBox/ArticleBox";

export default function Search() {
  const { value } = useParams();
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/v1/search/${value}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        
        setCourses(data.allResultCourses);
        setArticles(data.allResultArticles);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتایج جستجو برای دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length?(
                <>
               {courses.map(course=>(
                   <CourseBox {...course} key={course._id}/>
               ))}                  
                </>):(
                    <>
                        <div className="alert alert-warning">دوره ای یافت نشد!</div>
                    </>
                )}             
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="نتایج جستجو برای مقاله ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {articles.length?(
                <>
               {articles.map(article=>(
                   <ArticleBox {...article} key={article._id}/>
               ))}                  
                </>):(
                    <>
                        <div className="alert alert-warning">مقاله ای یافت نشد!</div>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
