import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Form/Input";
import {
    requierdValidator,
    minValidator,
    maxValidator,
    emailValidator,
} from "../../validators/rules";

import "./Contact.css";
import { useForm } from "../../hooks/useForm";
import Button from "../../components/Form/Button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function Contact() {
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      body: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const navigate = useNavigate();
  const addNewContact = (e) => {
    console.log("درخواست شما برای مدیران سایت ارسال شد");
    e.preventDefault();
    const newContact={
      name:formState.inputs.name.value,
      email:formState.inputs.email.value,
      phone:formState.inputs.phone.value,
      body:formState.inputs.body.value,
    }
    fetch('http://localhost:3000/v1/contact',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },  
      body:JSON.stringify(newContact)
    }).then(res=>{
      if(res.ok){
        res.json();
      Swal.fire({
        title: "سپاس از شما",
        text: "پیام شما با موفقیت ارسال شد",
        icon: "success",
        confirmButtonText:'بازگشت به پنل'
      }).then(value=>{
        navigate('/')
      });        
      }
    })
  };
  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ارتباط با ما</span>
          <span className="login__subtitle">
            نظر یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" className="login-form">
            <div className="login-form__username login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="name"
                className="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                validations={[requierdValidator(), minValidator(6), maxValidator(20)]}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="email"
                className="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
                validations={[requierdValidator(), minValidator(8), maxValidator(40), emailValidator()]}
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__phone-number login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="phone"
                className="login-form__password-input"
                type="text"
                placeholder="شماره تماس"
                validations={[requierdValidator(), minValidator(10), maxValidator(11)]}
              />
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <div className="login-form__text login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="textarea"
                id="body"
                className="login-form__text-input"
                placeholder="متن خود را وارد کنید"
                validations={[requierdValidator(), minValidator(10)]}
              />
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid === true
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="submit"
              onClick={addNewContact}
              disabled={!formState.isFormValid}
            >
              <span className="login-form__btn-text">ارسال</span>
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
