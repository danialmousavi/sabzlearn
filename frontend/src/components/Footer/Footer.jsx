import React from "react";
import "./Footer.css";
import FooterItem from "../FooterItem/FooterItem";
import { Link } from "react-router";
import Input from "../Form/Input";
import { emailValidator } from "../../validators/rules";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
export default function Footer() {
    const [formState,onInputHandler]=useForm({
      email:{
        value:"",
        isValid:false
      },
    },false)
    const addNewEmail=(e)=>{
      e.preventDefault();
      const emailData={
        email:formState.inputs.email.value
      }
      fetch("http://localhost:3000/v1/newsletters",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(emailData)
      }).then(res=>{
        if(res.ok){
          return res.json()
        } else{
          return res.text().then(text=>{
            throw new Error(text)
          })
        }
        
      }).then(result=>{
              Swal.fire({
                title: "سپاس از شما",
                text: "شما با موفقیت در خبرنامه عضو شدین",
                icon: "success",
                confirmButtonText:'متوجه شدم'
              })
      }).catch(err=>{
        console.log('err=>',err);
        Swal.fire({
          title: "خطا!",
          icon: "error",
          confirmButtonText:'متوجه شدم'
        })
      } )
    }
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-widgets">
            <div className="row">
              <FooterItem title="درباره ما">
                <p className="footer-widgets__text">
                  وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که
                  در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل
                  قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی
                  و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی
                  کنم! و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک
                  آکادمی خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی
                  اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی
                  سبزلرن رد شه! این به این معنی هست که ما برامون فن بیان و نحوه
                  تعامل مدرس با دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین
                  پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که مدرسین وب
                  سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه
                  دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته
                  باشند !
                </p>
              </FooterItem>
              <FooterItem title="آخرین مطالب">
                  <a href="#" className="footer-widgets__link">
                    نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                  </a>
                  <a href="#" className="footer-widgets__link">
                    چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن پایتون      
                  </a>
                  <a href="#" className="footer-widgets__link">
                    آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به گام و تصویری
                  </a>
                  <a href="#" className="footer-widgets__link">
                    بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی معایب و مزایا
                  </a>
                  <a href="#" className="footer-widgets__link">
                    معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش رایگان
                  </a>
              </FooterItem>
              <FooterItem title="دسترسی سریع">
                <div className="row">
                  <div className="col-6">
                    <a href="#" className="footer-widgets__link">
                      آموزش HTML
                    </a>
                    </div>

                  <div className="col-6">
                    <a href="#" className="footer-widgets__link">
                      آموزش CSS
                    </a>
                  </div>
                    
                  <div className="col-6">

                    <a href="#" className="footer-widgets__link">
                      آموزش جاوا اسکریپت
                    </a>
                  </div>
                  <div className="col-6">

                    <a href="#" className="footer-widgets__link">
                      آموزش بوت استرپ
                    </a>
                  </div>
                  <div className="col-6">

                    <a href="#" className="footer-widgets__link">
                      آموزش ریکت
                    </a>
                  </div>

                  <div className="col-6">

                    <a href="#" className="footer-widgets__link">
                      آموزش پایتون
                    </a>
                  </div>
                  <div className="col-6">

                    <Link to="/contact" className="footer-widgets__link">
                      ارتباط با ما
                    </Link>
                  </div>
                <div className="col-12">
                  <span className="footer-widgets__title">اشتراک در خبرنامه</span>
                  <span className="footer-widgets__text text-center d-block">
                    جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک شوید!
                  </span>
                  <form action="#" className="footer-widgets__form">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      className="footer-widgets__input"
                      placeholder="ایمیل خود را وارد کنید."
                      onInputHandler={onInputHandler}
                      validations={[emailValidator()]}
                    />
                    <button
                      type="submit"
                      className="footer-widgets__btn"
                      onClick={addNewEmail}
                    >
                      عضویت
                    </button>
                  </form>
                </div>                  
                  </div>
              </FooterItem>
            </div>
          </div>
        </div>
        <div className="footer__copyright">
        <span className="footer__copyright-text">
          ساخته شده با 💚 توسط دانیال موسوی
        </span>
      </div>
      </footer>
    </>
  );
}
