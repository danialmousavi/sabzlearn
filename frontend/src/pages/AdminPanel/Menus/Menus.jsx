import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import Swal from 'sweetalert2';

export default function Menus() {
    const [menus, setMenus] = useState([]);
  const getAllMenus=()=>{
        fetch('http://localhost:3000/v1/menus/all').then(res=>res.json()).then(data=>setMenus(data)
    )
  }
  useEffect(()=>{
getAllMenus()
;  },[])
  const deleteMenu=(menuID)=>{
    console.log(menuID);
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
              fetch(`http://localhost:3000/v1/menus/${menuID}`,{
                method:"DELETE",
                headers:{
                  Authorization:`Bearer ${localStorageData}`
                }
              }).then(res=>{
                if(res.ok){
                  Swal.fire({
                    title:"منو با موفقیت حذف شذ",
                    icon:"success"
                  }).then(()=>{
                    getAllMenus();
                  })
                }else{
                  Swal.fire({
                    title:"متاسفیم منو حذف نشد",
                    icon:"error"
                  })
                }
              })
            }
          })
          }
  return (
    <>
          <DataTable title="منوها">
            <table class="table">
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>عنوان</th>
                  <th>مقصد</th>
                  <th>فرزند ...</th>
                  <th>ویرایش</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{menu.title}</td>
                    <td>{menu.href}</td>
                    <td>{menu.parent ? menu.parent.title : (<i className="fa fa-check"></i>)}</td>
                    <td>
                      <button type="button" class="btn btn-primary edit-btn">
                        ویرایش
                      </button>
                    </td>
                    <td>
                      <button type="button" class="btn btn-danger delete-btn" onClick={()=>deleteMenu(menu._id)}>
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
