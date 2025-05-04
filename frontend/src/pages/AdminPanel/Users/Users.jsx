import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable'
import Swal from 'sweetalert2';
import Input from '../../../components/Form/Input';
import { useForm } from '../../../hooks/useForm';
import { requierdValidator,emailValidator,maxValidator,minValidator } from '../../../validators/rules';
export default function Users() {
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
  const [users, setUsers] = useState([]);
  //fetch users from api
  const fetchUsers=()=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'))
    
    fetch("http://localhost:3000/v1/users",{
      headers:{
        "Authorization":`Bearer ${localStorageData}`
      }
    }).then(res=>res.json()).then(data=>{
      setUsers(data);

    }
    )
  }
  useEffect(()=>{
      fetchUsers();
  },[])
  //delete user function
  const DeleteUser=(id)=>{
        Swal.fire({
          title: "حذف کاربر",
          text: "آیا مطمئن هستید؟",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "خیر",
          confirmButtonText:'بله'
        }).then((result)=>{
            if(result.isConfirmed){
              const localStorageData=JSON.parse(localStorage.getItem('user'))
              fetch(`http://localhost:3000/v1/users/${id}`,{
                method:"DELETE",
                headers:{
                  "Authorization":`Bearer ${localStorageData}`
                }
              }).then(res=>{
                  if(res.ok){
                    Swal.fire({
                      title: "تبریک",
                      text: "کاربر با موفقیت حذف شد",
                      icon: "success",
                      confirmButtonText:'تایید'
                    });
                    fetchUsers();
                  } else {
                    Swal.fire({
                      title: "متاسفیم ",
                      text: "کاربر حذف نشد",
                      icon: "error",
                      confirmButtonText:'تایید'
                    });
                  }
              }).catch(() => {
                Swal.fire({
                  title: "متاسفیم ",
                  text: "خطایی رخ داد",
                  icon: "error",
                  confirmButtonText:'تایید'
                });
              })
              
            }
        })
  }
  const BanUser=(id)=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'))
    Swal.fire({
        title: "بن کاربر",
        text: "آیا مطمئن هستید؟",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "خیر",
        confirmButtonText:'بله'
    }).then(result=>{
      if(result.isConfirmed){
        fetch(`http://localhost:3000/v1/users/ban/${id}`,{
          method:"PUT",
          headers:{
            "Authorization":`Bearer ${localStorageData}`
          }
        }).then(res=>{
          if(res.ok){
            Swal.fire({
              title: "تبریک",
              text: "کاربر با موفقیت بن شد",
              icon: "success",
              confirmButtonText:'تایید'
            });
          } else {
            Swal.fire({
              title: "متاسفیم ",
              text: "کاربر بن نشد",
              icon: "error",
              confirmButtonText:'تایید'
            });
          }
    
        })
      }
    })

  }
  //register new user function
  const registerNewUser=(e)=>{
    e.preventDefault();
    const newUser={
      name:formState.inputs.name.value,
      username:formState.inputs.username.value,
      email:formState.inputs.email.value,
      phone:formState.inputs.phone.value,
      password:formState.inputs.password.value,
      confirmPassword:formState.inputs.password.value,
    }
    fetch('http://localhost:3000/v1/auth/register',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(newUser),

    }).then(res=>{
      if(res.ok){
        Swal.fire({
          title: "تبریک",
          text: "کاربر با موفقیت ثبت نام شد",
          icon: "success",
          confirmButtonText:'تایید'
        }).then(value=>{
          fetchUsers();
        });
      } else {
        Swal.fire({
          title: "متاسفیم ",
          text: "کاربر ثبت نام نشد",
          icon: "error",
          confirmButtonText:'تایید'
        });
      }
    }
    ).catch(err=>{
      Swal.fire({
        title: "متاسفیم ",
        text: "خطایی رخ داد",
        icon: "error",
        confirmButtonText:'تایید'
      });
    })
  }
  return (
    <>
              <div class="home-content-edit">
            <div class="back-btn">
              <i class="fas fa-arrow-right"></i>
            </div>
            <form class="form">
              <div class="col-6">
                <div class="login-form__username admin-p-inputs">
                  <label class="input-title">نام و نام خانوادگی</label>
                  <Input
                    type="text"
                    className="login-form__password-input"
                    id="name"
                    element="input"
                    validations={[
                      requierdValidator(),
                      minValidator(8),
                      maxValidator(20),
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
                  />
                  <span class="error-message text-danger"></span>
                </div>
              </div>
              <div class="col-6">
                <div class="login-form__username admin-p-inputs">
                  <label class="input-title">نام کاربری</label>
                  <Input
                    type="text"
                    className="login-form__password-input"
                    id="username"
                    element="input"
                    validations={[
                      requierdValidator(),
                      minValidator(8),
                      maxValidator(20),
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا نام کاربری را وارد کنید..."
                  />
                  <span class="error-message text-danger"></span>
                </div>
              </div>
              <div class="col-6">
                <div class="login-form__username admin-p-inputs">
                  <label class="input-title">ایمیل</label>
                  <Input
                    type="text"
                    className="login-form__password-input"
                    id="email"
                    element="input"
                    validations={[
                      requierdValidator(),
                      minValidator(8),
                      maxValidator(20),
                      emailValidator(),
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا ایمیل کاربر را وارد کنید..."
                  />
                  <span class="error-message text-danger"></span>
                </div>
              </div>
              <div class="col-6">
                <div class="login-form__username admin-p-inputs">
                  <label class="input-title">رمز عبور</label>
                  <Input
                    type="text"
                    className="login-form__password-input"
                    id="password"
                    element="input"
                    validations={[
                      requierdValidator(),
                      minValidator(8),
                      maxValidator(20),
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا رمز عبور کاربر را وارد کنید..."
                  />
                  <span class="error-message text-danger"></span>
                </div>
              </div>
              <div class="col-6">
                <div class="login-form__username admin-p-inputs">
                  <label class="input-title">شماره تلفن</label>
                  <Input
                    type="text"
                    className="login-form__password-input"
                    id="phone"
                    element="input"
                    validations={[
                      requierdValidator(),
                      minValidator(8),
                      maxValidator(20),
                    ]}
                    onInputHandler={onInputHandler}
                    placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
                  />
                  <span class="error-message text-danger"></span>
                </div>
              </div>
              <div class="col-12">
                <div class="bottom-form">
                  <div class="submit-btn">
                    <input type="submit" value="افزودن" onClick={registerNewUser} />
                  </div>
                </div>
              </div>
            </form>
          </div>
    <DataTable title="کاربران">
              <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی </th>
              <th>ایمیل</th>
            </tr>
          </thead>
          <tbody>
            {users&&users.map((user,index)=>(
            <tr>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={()=>DeleteUser(user._id)}>
                  حذف
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={()=>BanUser(user._id)}>
                  بن
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
    </DataTable>
    </>
  )
}
