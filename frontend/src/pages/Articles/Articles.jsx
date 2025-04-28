import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar/Topbar'
import Navbar from '../../components/Navbar/Navbar'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import Footer from '../../components/Footer/Footer';
import Pagination from '../../components/Pagination/Pagination';
import ArticleBox from '../../components/ArticleBox/ArticleBox';

export default function Articles() {
    const [articles,setArticles]=useState([]);
    const [shownArticles,setShownArticles]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/v1/articles').then(res=>res.json()).then(data=>setArticles(data))
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
                title: "مقاله ها",
                to: "articles/1",
              },
            ]}
          />    
              <section className="courses">
                <div className="container">
                  <div className="courses-content">
                    <div className="container">
                      <div className="row">
                        {shownArticles.map(course=>(
                        <ArticleBox {...course}/>
                        ))}
                      </div>
                    </div>
                  </div>
                      <Pagination
                        items={articles}
                        itemCount={3}
                        pathName="/articles"
                        setShownCourses={setShownArticles}
                      />
                </div>
              </section>
              {/* <!--------------------------------  Courses-Section  --------------------------------> */}
        <Footer/>
    </>
  )
}
