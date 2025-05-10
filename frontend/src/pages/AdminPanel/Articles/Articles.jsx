import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import Swal from 'sweetalert2';
import { useForm } from "../../../hooks/useForm";
import { minValidator, requierdValidator } from "../../../validators/rules";
import Input from "../../../components/Form/Input";
import Editor from '../../../components/Form/Editor';
export default function Articles() {
  const [allArticles,setAllArticles]=useState([]);
  useEffect(()=>{
    getAllArticles();
    fetch("http://localhost:3000/v1/category")
    .then((res) => res.json())
      .then((data) => {
      setCategories(data);
        console.log(data);
      });
  },[])
  const getAllArticles=()=>{
    fetch('http://localhost:3000/v1/articles').then(res=>res.json()).then(data=>{
      setAllArticles(data);
      console.log(data);
    })
  }
  //deleteArticle
  const deleteArticle=(articleID)=>{
        const localStorageData=JSON.parse(localStorage.getItem("user"));
          Swal.fire({
            title:"آیا از حذف مطمن هستید؟",
            icon:"question",
            confirmButtonText:"بله",
            showConfirmButton:true,
            cancelButtonText:"خیر",
            showCancelButton:true
          }).then(result=>{
            if(result.isConfirmed){
              fetch(`http://localhost:3000/v1/articles/${articleID}`,{
                method:"DELETE",
                headers:{
                   Authorization:`Bearer ${localStorageData}`,
                }
              }).then(res=>{
                if(res.ok){
                  Swal.fire({
                    title:"مقاله با موفقیت حذف شذ",
                    icon:"success"
                  }).then(()=>{
                    getAllArticles();
                  })
                }else{
                  Swal.fire({
                    title:"متاسفیم مقاله حذف نشد",
                    icon:"error"
                  })
                }
              })
            }
          })
  }
  //create Article
  const [ArticleCover,setArticleCover]=useState({})
  const [articleCategory,setArticleCategory]=useState("-1");
  const [categories,setCategories]=useState([]);
  const [articleBody,setArticleBody]=useState('');
    const [formState, onInputHandler] = useForm(
      {
        name: {
          value: "",
          isValid: false,
        },
        shortName: {
          value: "",
          isValid: false,
        },
        description: {
          value: "",
          isValid: false,
        },

      },
      false
    );
    const CreateArticle=(e)=>{
      e.preventDefault();
     const localStorageData=JSON.parse(localStorage.getItem("user"));
      let formData=new FormData();
      formData.append("title",formState.inputs.name.value);
      formData.append("description",formState.inputs.description.value);
      formData.append("shortName",formState.inputs.shortName.value);
      formData.append("categoryID",articleCategory);
      formData.append("cover",ArticleCover);
      formData.append("body",articleBody);
      fetch('http://localhost:3000/v1/articles',{
        method:"POST",
        headers:{
         Authorization:`Bearer ${localStorageData}`,
        },
        body:formData
      }).then(res=>{
        if(res.ok){
          Swal.fire({
            title:"مقاله با موفقیت ایجاد شد",
            icon:"success"
          }).then(()=>{
            getAllArticles();
          })
        }else{
          Swal.fire({
            title:"مقاله با ایجاد نشد",
            icon:"error"
          })
        }
      })
    }
  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <Input
                  element="input"
                  type="text"
                  id="title"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(8)]}
                  className="login-form__password-input"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <Input
                  element="input"
                  type="text"
                  id="shortName"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  className="login-form__password-input"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                <Input
                  element="textarea"
                  type="text"
                  id="description"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  className="article-textarea"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0]);
                  }}
                  className="login-form__password-input"
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="name input">
                <label class="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                  <Editor value={articleBody} setValue={setArticleBody}/>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn" onClick={CreateArticle}>
                  <input type="submit" value="افزودن" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    
    <DataTable title='مقاله ها'>
           <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>اسم مقاله</th>
              <th>لینک مقاله</th>
              <th>نویسنده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {allArticles&&allArticles.map((article,index)=>(
            <tr key={article._id}>
              <td>{index+1}</td>
              <td>{article.title}</td>
              <td>{article.shortName}</td>
              <td>{article.creator.name}</td>
              <td>
                <button type="button" class="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger delete-btn" onClick={()=>deleteArticle(article._id)}>
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
