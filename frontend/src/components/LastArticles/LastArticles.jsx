import React, { useEffect } from "react";
import "./LastArticles.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import ArticleBox from "../ArticleBox/ArticleBox";
export default function LastArticles() {
  const [articles, setArticles] = React.useState([]);
  useEffect(()=>{
    fetch("http://localhost:3000/v1/articles").then(res=>res.json()).then(data=>setArticles(data))
  },[])
  console.log(articles);
  
  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnHref="articles/1"
        />
        <div className="articles__content">
          <div className="row">
            {articles.map((article)=>(
            <ArticleBox {...article}/>

            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
