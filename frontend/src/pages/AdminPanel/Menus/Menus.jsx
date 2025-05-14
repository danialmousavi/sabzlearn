import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminPanel/DataTable/DataTable';
import Swal from 'sweetalert2';
import { useForm } from "../../../hooks/useForm";
import { minValidator, requierdValidator } from "../../../validators/rules";
import Input from "../../../components/Form/Input";
export default function Menus() {
    const [menus, setMenus] = useState([]);
    const [menuParent,setMenuParent]=useState('-1');
    const [formState, onInputHandler]=useForm({
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },false)
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
          //createMenu
          const createMenu=(e)=>{
            e.preventDefault();
            const localStorageData=JSON.parse(localStorage.getItem("user"));

            const newMenu={
              title:formState.inputs.title.value,
              href:formState.inputs.href.value,
              parent:menuParent=='-1'?undefined:menuParent,
            }
            fetch('http://localhost:3000/v1/menus',{
              method:"POST",
              headers:{
                  Authorization:`Bearer ${localStorageData}`,
                  "Content-Type":"application/json",
              },
              body:JSON.stringify(newMenu)
            }).then(res=>{
              if(res.ok){
                Swal.fire({
                  title:"منو با موفقیت ایجاد شد",
                  icon:"success"
                }).then(()=>{
                  getAllMenus();
                })
              }else{
                  Swal.fire({
                  title:"منو ایجاد نشد",
                  icon:"error"
                })
              }
            })
            
          }
  return (
    <>
          <div class="container">
            <div class="home-title">
              <span>افزودن کاربر جدید</span>
            </div>
            <form class="form">
              <div class="col-6">
                <div class="name input">
                  <label class="input-title">عنوان</label>
                  <Input
                    element="input"
                    onInputHandler={onInputHandler}
                    id="title"
                    type="text"
                    isValid="false"
                    placeholder="لطفا عنوان را وارد کنید..."
                    validations={[minValidator(5)]}
                  className="login-form__password-input"

                  />
                  <span class="error-message text-danger"></span>
                </div>
              </div>
              <div class="col-6">
                <div class="name input">
                  <label class="input-title">لینک</label>
                  <Input
                    element="input"
                  className="login-form__password-input"

                    onInputHandler={onInputHandler}
                    id="href"
                    type="text"
                    isValid="false"
                    validations={[minValidator(5)]}
                    placeholder="لطفا عنوان را وارد کنید..."
                  />
                  <span class="error-message text-danger"></span>
                </div>
              </div>
              <div class="col-6">
                <div class="name input">
                  <label class="input-title">عنوان</label>
                  <select
                    class="select"
                    onChange={(event) => setMenuParent(event.target.value)}
                  >
                    <option value="-1">منوی اصلی را انتخاب کنید</option>
                    {menus.map((menu) => (
                      <>
                        {!Boolean(menu.parent) && (
                          <option value={menu._id}>{menu.title}</option>
                        )}
                      </>
                    ))}
                  </select>
                  <span class="error-message text-danger"></span>
                </div>
              </div>
              <div class="col-12">
                <div class="bottom-form">
                  <div class="submit-btn">
                    <input type="submit" value="افزودن" onClick={createMenu} />
                  </div>
                </div>
              </div>
            </form>
          </div>
    
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
