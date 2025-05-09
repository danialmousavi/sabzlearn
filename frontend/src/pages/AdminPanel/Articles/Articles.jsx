import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import Swal from 'sweetalert2';

export default function Articles() {
  const [allArticles,setAllArticles]=useState([]);
  useEffect(()=>{
    getAllArticles();
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
  return (
    <>
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
