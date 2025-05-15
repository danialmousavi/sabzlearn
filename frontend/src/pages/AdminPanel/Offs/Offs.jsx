import React, { useEffect, useState } from 'react'
import Input from '../../../components/Form/Input'
import { minValidator, requierdValidator } from '../../../validators/rules'
import { useForm } from '../../../hooks/useForm';

export default function Offs() {
    const [offCourse,setOffCourse]=useState('-1');
    const[courses,setCourses]=useState([]);
    const [formState,onInputHandler]=useForm({
     code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      max: {
        value: "",
        isValid: false,
      },
    },false)
    useEffect(()=>{
    fetch(`http://localhost:3000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses)
      });
    },[])
    //createOff
    const createOff=(e)=>{
      e.preventDefault();
      const localStorageData=JSON.parse(localStorage.getItem("user"));
      const newOff={
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      course: offCourse,
      max: formState.inputs.max.value,
      }
      fetch('http://localhost:3000/v1/offs',{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          Authorization:`Bearer ${localStorageData}`
        },
        body:JSON.stringify(newOff)
      }).then(res=>console.log(res)
      )
    }
  return (
    <>
          <div class="container-fluid" id="home-content">
            <div class="container">
              <div class="home-title">
                <span>افزودن جلسه جدید</span>
              </div>
              <form class="form">
                <div class="col-6">
                  <div class="price input">
                    <label class="input-title">کد تخفیف</label>
                    <Input
                      element="input"
                      onInputHandler={onInputHandler}
                      type="text"
                      id="code"
                      validations={[minValidator(5)]}
                      placeholder="لطفا کد تخفیف را وارد نمایید"
                        className="login-form__password-input"

                    />
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
    
                <div class="col-6">
                  <div class="price input">
                    <label class="input-title">درصد تخفیف</label>
                    <Input
                      element="input"
                      onInputHandler={onInputHandler}
                      type="text"
                      id="percent"
                      validations={[requierdValidator()]}
                      placeholder="لطفا درصد تخفیف را وارد نمایید"
                  className="login-form__password-input"

                    />
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
    
                <div class="col-6">
                  <div class="name input">
                    <label class="input-title">حداکثر استفاده</label>
                    <Input
                      element="input"
                      onInputHandler={onInputHandler}
                      type="text"
                      id="max"
                      validations={[requierdValidator()]}
                      placeholder="حداکثر استفاده از کد تخفیف"
                  className="login-form__password-input"

                    />
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
    
                <div class="col-6">
                  <div class="price input">
                    <label class="input-title" style={{ display: "block" }}>
                      دوره
                    </label>
                    <select
                      class="select"
                      onChange={(event) => setOffCourse(event.target.value)}
                    >
                      <option value="-1">دوره مدنظر را انتخاب کنید</option>
                      {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
                <div class="col-12">
                  <div class="bottom-form">
                    <div class="submit-btn">
                      <input type="submit" value="افزودن" onClick={createOff} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
    </>
  )
}
