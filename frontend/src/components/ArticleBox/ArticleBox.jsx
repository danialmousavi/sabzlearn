import React from 'react'
import './ArticleBox.css'
import { Link } from 'react-router'
export default function ArticleBox({title,description,cover,shortName}) {
  return (
    <div className="col-4">
    <div className="article-card">
      <div className="article-card__header">
        <Link to={`/article-info/${shortName}`} className="article-card__link-img">
          <img src={cover} className="article-card__img" alt="Article Cover" />
        </Link>
      </div>
      <div className="article-card__content">
        <a href="#" className="article-card__link">
            {title}
        </a>
        <p className="article-card__text">
            {description}
        </p>
        <a href="#" className="article-card__btn">بیشتر بخوانید</a>
      </div>
    </div>
  </div>
  )
}
