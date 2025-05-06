import React, { useEffect, useState } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import Input from "../../../components/Form/Input";
import { useForm } from "../../../hooks/useForm";
import { requierdValidator,emailValidator,maxValidator,minValidator } from '../../../validators/rules';
import'./Category.css'
import Swal from "sweetalert2";
export default function Category() {
  const [Categories, setCategories] = useState([]);
  const getAllCategoies = () => {
    fetch("http://localhost:3000/v1/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        console.log(data);
      });
  };
  //get all categories
  useEffect(() => {
    getAllCategoies();
  }, []);
  //create new category
    const [formState,onInputHandler]=useForm({
          title:{
            value:"",
            isValid:false
          },
          shortname:{
            value:"",
            isValid:false
          },
        },false)
  const createNewCategory=(e)=>{
    e.preventDefault();
    const localStorageData=JSON.parse(localStorage.getItem('user'))
    const newCategory={
        title:formState.inputs.title.value,
        name:formState.inputs.shortname.value
    }
    fetch("http://localhost:3000/v1/category",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorageData}`
        },
        body:JSON.stringify(newCategory)
    })    .then(res=>{
        if(res.ok){
            return res.json()
        }else{
            throw new Error("خطا در ایجاد دسته بندی جدید")
        }
    }).then(data=>{
        getAllCategoies();
            Swal.fire({
              title: "تبریک",
              text: "دسته بندی با موفقیت اضافه شد",
              icon: "success",
              confirmButtonText:'تایید'
            });        
    }).catch(err=>{
        console.log(err)
        Swal.fire({
            title: "متاسفیم",
            text: "دسته بندی با  اضافه نشد",
            icon: "error",
            confirmButtonText:'تایید'
          });   
    }
    )
  }
  return (
    <>
          <div class="container-fluid" id="home-content">
            <div class="container">
              <div class="home-title">
                <span>افزودن دسته‌بندی جدید</span>
              </div>
              <form class="form">
                <div class="col-6">
                  <div class="name input">
                    <label class="input-title">عنوان</label>
                  <Input
                    type="text"
                    className="login-form__password-input"
                    element="input"
                    onInputHandler={onInputHandler}
                    id="title"
                    placeholder="لطفا عنوان را وارد کنید..."
                    validations={[minValidator(5), maxValidator(20)]}
                  />                    
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
                <div class="col-6">
                  <div class="name input">
                    <label class="input-title">اسم کوتاه</label>
                    <Input
                    type="text"
                    className="login-form__password-input"
                    element="input"
                    onInputHandler={onInputHandler}
                    id="shortname"
                    placeholder="لطفا اسم کوتاه را وارد کنید..."
                    validations={[minValidator(5), maxValidator(20)]}
                    />
                    <span class="error-message text-danger"></span>
                  </div>
                </div>
                <div class="col-12">
                  <div class="bottom-form">
                    <div class="submit-btn">
                      <input
                        type="submit"
                        value="افزودن"
                        onClick={createNewCategory}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
      <DataTable title="دسته بندی ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {Categories&&Categories.map((category,index)=>(
            <tr>
              <td>{index+1}</td>
              <td>{category.title}</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" >
                  حذف
                </button>
              </td>

            </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
