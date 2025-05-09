import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';

export default function Articles() {
  const [allArticles,setAllArticles]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/v1/articles').then(res=>res.json()).then(data=>{
      setAllArticles(data);
      console.log(data);
    })
  },[])
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
                <button type="button" class="btn btn-danger delete-btn">
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
