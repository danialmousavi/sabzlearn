import React, { useContext } from 'react'
import './CommentsTextArea.css'
import AuthContext from '../../context/authContext'
export default function CommentsTextArea() {
  const authContext=useContext(AuthContext);
  
  return (
    <div className="comments">
    <span className="comments__title">
      دیدگاهتان را بنویسید
    </span>
    <span className="comments__text">
      <a href="#">
        با عنوان {`${authContext.isLoggedIn?authContext.userInfo.name:"کاربر لاگین نکرده "} `} 
      وارد شده اید.
      </a>
       <a href="#">خارج میشوید? </a>
      بخش های موردنیاز علامت گذاری شده اند *
    </span>
    {authContext.isLoggedIn?(
      <>
       <div className="comments_content">
      <span className="comments__content-title">دیدگاه *</span>
      <textarea className="comments__content-textarea"></textarea>
    </div>
    <button type="submit" className="comments__button">فرستادن دیدگاه</button>
      </>
    ):(
      <div className='alert alert-warning'>شما هنوز لاگین نکرده اید</div>
    )}
  </div>
  )
}
