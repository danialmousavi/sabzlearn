import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Register.css'
import Topbar from '../../components/Topbar/Topbar'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Input from '../../components/Form/Input'
import Button from '../../components/Form/Button'
import { requierdValidator,minValidator,maxValidator,emailValidator } from '../../validators/rules'
import { useForm } from '../../hooks/useForm'
import Swal from 'sweetalert2'
import AuthContext from '../../context/authContext'
export default function Register() {
    const authContext=useContext(AuthContext)
    console.log(authContext);
    const navigate=useNavigate();
    const [formState,onInputHandler]=useForm({
      name:{
        value:"",
        isValid:false
      },
      username:{
        value:"",
        isValid:false
      },
      phone:{
        value:"",
        isValid:false
      },
      password:{
        value:"",
        isValid:false
      },
      email:{
        value:"",
        isValid:false
      }
    },false)
    const handleRegister=(e)=>{
      e.preventDefault();
      const newUser={
        name: formState.inputs.name.value,
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        phone: formState.inputs.phone.value,
        password:formState.inputs.password.value,
        confirmPassword:formState.inputs.password.value,
      }
      fetch('http://localhost:3000/v1/auth/register',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(newUser),
      }).then(res=>{
        if(res.status===201){
      Swal.fire({
        title: "خوش آمدید",
        text: "شما با موفقیت ثبت نام کردین",
        icon: "success",
        confirmButtonText:'ورود به پنل'
      }).then(value=>{
        navigate('/')
      });
        }
        return res.json(); 
      }).then(result=>{
        authContext.login(result.user,result.accessToken);
      })      
    }
  return (
    <>
        <Topbar/>
        <Navbar/>
              <section className="login-register">
                <div className="login register-form">
                  <span className="login__title">ساخت حساب کاربری</span>
                  <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
                  <div className="login__new-member">
                    <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
                    <Link className="login__new-member-link" to="/login">
                      وارد شوید
                    </Link>
                  </div>
                  <form action="#" className="login-form">
                  <div className="login-form__username">
                      <Input
                      element="input"
                      className="login-form__username-input"
                      type="text"
                      placeholder="نام و نام خانوادگی "
                      id="name"
                      onInputHandler={onInputHandler}
                      validations={[
                        requierdValidator(),
                        minValidator(2),
                        maxValidator(18)                        
                      ]}
                      />                      
                      <i className="login-form__username-icon fa fa-user"></i>
                    </div>
                    <div className="login-form__username">
                      <Input
                      element="input"
                      className="login-form__username-input"
                      type="text"
                      placeholder="نام کاربری "
                      id="username"
                      onInputHandler={onInputHandler}
                      validations={[
                        requierdValidator(),
                        minValidator(8),
                        maxValidator(18)                        
                      ]}                      
                      />                      
                      <i className="login-form__username-icon fa fa-user"></i>
                    </div>
                    <div className="login-form__username">
                      <Input
                      element="input"
                      className="login-form__username-input"
                      type="text"
                      placeholder="شماره موبایل "
                      id="phone"
                      onInputHandler={onInputHandler}
                      validations={[
                        requierdValidator(),
                        minValidator(10),
                        maxValidator(11)                        
                      ]}                      
                      />                      
                      <i className="login-form__username-icon fa fa-user"></i>
                    </div>                    
                    <div className="login-form__password">

                      <Input
                      element="input"
                      className="login-form__password-input"
                      type="text"
                      placeholder="آدرس ایمیل"
                      id="email"
                      onInputHandler={onInputHandler}
                      validations={[
                        requierdValidator(),
                        minValidator(2),
                        emailValidator(),
                        maxValidator(18)                        
                      ]}
                      />                            
                      <i className="login-form__password-icon fa fa-envelope"></i>
                    </div>
                    <div className="login-form__password">
                      <Input
                      element="input"
                      className="login-form__password-input"
                      type="text"
                      placeholder="رمز عبور"
                      id="password"
                      onInputHandler={onInputHandler}
                      validations={[
                        requierdValidator(),
                        minValidator(8),
                        maxValidator(18)                        
                      ]}
                      />                            
                      <i className="login-form__password-icon fa fa-lock-open"></i>
                    </div>
                    <Button  className={`login-form__btn ${formState.isFormValid?"login-form__btn-success":"login-form__btn-error"}`} type="submit" disabled={!formState.isFormValid} onClick={handleRegister}>
                    <i className="login-form__btn-icon fa fa-user-plus"></i>
                    <span className="login-form__btn-text">عضویت</span>
                    </Button>
                  </form>
                  <div className="login__des">
                    <span className="login__des-title">سلام کاربر محترم:</span>
                    <ul className="login__des-list">
                      <li className="login__des-item">
                        لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                        استفاده کنید.
                      </li>
                      <li className="login__des-item">
                        ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
                      </li>
                      <li className="login__des-item">
                        لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
        <Footer/>
    </>
)
}
