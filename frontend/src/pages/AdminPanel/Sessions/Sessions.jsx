import React, { useEffect, useState } from 'react'
import Input from '../../../components/Form/Input'
import { minValidator } from '../../../validators/rules'
import { useForm } from '../../../hooks/useForm'
import Swal from 'sweetalert2';
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
export default function Sessions() {
    const [courses,setCourses]=useState([]);
    const [sessionCourse,setSessionCourse]=useState('-1');
    const [sessionVideo,setSessionVideo]=useState({});
    const [sessions,setSessons]=useState([]);
    const[isSessionFree,setIsSessionFree]=useState("0")
    const [formState,onInputHandler]=useForm({
        title:{
          value: "",
          isValid: false,            
        },
        time:{
          value: "",
          isValid: false,            
        },        
    },false)
    useEffect(()=>{
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:3000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
      //get sessions
      getAllSessions();
    },[])
    const createSession=(e)=>{
      e.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    const formData=new FormData();
    formData.append("title",formState.inputs.title.value);
    formData.append("time",formState.inputs.time.value);
    formData.append("video",sessionVideo);
    formData.append("free",isSessionFree)
      if(sessionCourse!=='-1'){
              fetch(`http://localhost:3000/v1/courses/${sessionCourse}/sessions`,{
        method:"POST",
        headers:{
        Authorization: `Bearer ${localStorageData}`,

        },
        body:formData
      }).then(res=>{
        if(res.ok){
          Swal.fire({
            title:"تبریک",
            text:"ویدیوی دوره با موفقیت بارگذاری شد",
            icon:"success"
          }).then(()=>{
            getAllSessions();
          })
        }else{
          Swal.fire({
            title:"متاسفیم",
            text:"ویدیوی دوره بارگذاری نشد",
            icon:"error"
          })
        }
      }
      )
      }else{
        Swal.fire({
          title:"خطا",
          text:"لطفا دوره مورد نظر را انتخاب کنید",
          icon:"warning"
        })
      }
    }
    //show sessions that created
    const getAllSessions=()=>{
      fetch('http://localhost:3000/v1/courses/sessions').then(res=>res.json()).then(data=>{
        setSessons(data);
        console.log(data);
        
      });
    }
    //delete session
    const deleteSession=(sessionId)=>{
    const localStorageData = JSON.parse(localStorage.getItem("user"));

      Swal.fire({
        title:"آیا از حذف دوره اطمینان دارید؟",
        showConfirmButton:true,
        confirmButtonText:"بله",
        showCancelButton:true,
        cancelButtonText:"خیر"
      }).then(result=>{
        if(result.isConfirmed){
          fetch(`http://localhost:3000/v1/courses/sessions/${sessionId}`,{
            method:"DELETE",
            headers:{
              Authorization: `Bearer ${localStorageData}`,
            }
          }).then(res=>{
            if(res.ok){
              Swal.fire({
                title:"تبریک!",
                text:"این جلسه حذف شد",
                icon:"success"
              }).then(()=>{
                getAllSessions();
              })
            }else{
                Swal.fire({
                title:" متاسفیم!",
                text:"این جلسه حذف نشد",
                icon:"success"
              })
            }
          })
        }
      })
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
                  <div class="name input">
                    <label class="input-title">عنوان جلسه</label>
                    <Input
                      element="input"
                      onInputHandler={onInputHandler}
                      type="text"
                      id="title"
                      validations={[minValidator(5)]}
                      placeholder="لطفا نام جلسه را وارد کنید..."
                        className="login-form__password-input"

                    />
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="price input">
                    <label class="input-title">مدت زمان جلسه</label>
                    <Input
                      element="input"
                      onInputHandler={onInputHandler}
                      type="text"
                      id="time"
                      validations={[minValidator(5)]}
                      className="login-form__password-input"
                      placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                    />
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="price input">
                    <label class="input-title" style={{ display: "block" }}>
                      دوره
                    </label>
                    <select class="select" onChange={event => setSessionCourse(event.target.value)}>
                        <option value="-1">دوره مدنظر را انتخاب کنید</option>
                      {courses.map((course) => (
                        <option value={course._id} key={course._id}>{course.name}</option>
                      ))}
                    </select>
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="price input">
                    <label class="input-title" style={{ display: "block" }}>
                      انتخاب ویدیو
                    </label>
                      <input type="file" onChange={event=>setSessionVideo(event.target.files[0])} />
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
                <div class="col-6">
              <div class="presell">
                <label class="input-title">نوع جلسه</label>
                <div class="radios">
                  <div class="presell-true">
                    <label>
                      <span> پولی</span>
                      <input
                        type="radio"
                        value="0"
                        name="presell"
                        checked={isSessionFree=="0"}
                        onChange={e=>setIsSessionFree(e.target.value)}
                      />
                    </label>
                  </div>
                  <div class="presell-false">
                    <label>
                      <span>غیرپولی</span>
                      <input
                        type="radio"
                        value="1"
                        name="presell"
                        checked={isSessionFree=="1"}
                        onChange={e=>setIsSessionFree(e.target.value)}

                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
                <div class="col-12">
                  <div class="bottom-form">
                    <div class="submit-btn">
                      <input type="submit" value="افزودن" onClick={createSession}/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <DataTable title="جلسات">
           <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مدت زمان</th>
              <th>دوره</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {sessions&&sessions.map((session,index)=>(
            <tr key={session._id}>
              <td>{index+1}</td>
              <td>{session.title}</td>
              <td>{session.time}</td>
              <td>{session.course.name}</td>
              
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={()=>deleteSession(session._id)} >
                  حذف
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
