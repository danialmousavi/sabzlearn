import React, { useEffect, useState } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";
import Swal from "sweetalert2";
import "./Courses.css";
import { useForm } from "../../../hooks/useForm";
import { minValidator, requierdValidator } from "../../../validators/rules";
import Input from "../../../components/Form/Input";
export default function Courses() {
  const [Courses, setCourses] = useState([]);
  const getAllCourses = () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch("http://localhost:3000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  };
  useEffect(() => {
    getAllCourses();
  }, []);
  // console.log(Courses);
  //delete category
  const deleteCourse = (id) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    Swal.fire({
      title: "حذف دوره",
      text: "آیا مطمئن هستید که میخواهید این دوره را حذف کنید؟",
      icon: "warning",
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/v1/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData}`,
          },
        }).then((res) => {
          if (res.ok) {
            Swal.fire({
              title: "تبریک",
              text: "دوره با موفقیت حذف شد",
              icon: "success",
            }).then(() => {
              getAllCourses();
            });
          } else {
            Swal.fire({
              title: "متاسفیم",
              text: "دوره حذف نشد",
              icon: "error",
            });
          }
        });
      }
    });
  };
  //CREATE COURSE
  //get categories for selecting category
  const [categories, setCategories] = useState([]);
  const [selecetedCategory, setSelectedCategory] = useState("-1");
  const [courseStatus, setCourseStatus] = useState("presell");
  const [courseCover, setCourseCover] = useState({});
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      price: {
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
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    fetch("http://localhost:3000/v1/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        // console.log(data);
      });
  }, []);
  //option of select category change it will be store in selecetedCategory state
  const selectCategory = (e) => {
    setSelectedCategory(e.target.value);
  };
  const createNewCourse = (e) => {
    e.preventDefault();
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("categoryID", selecetedCategory);
    formData.append("price", formState.inputs.price.value);
    formData.append("support", formState.inputs.support.value);
    formData.append("status", courseStatus);
    formData.append("cover", courseCover);
    // console.log([...formData.entries()]);
    if (selecetedCategory == "-1") {
      Swal.fire({
        title:"لطفا دسته بندی دوره را انتخاب کنید",
        icon:"error",
      })
    } else {
      fetch(`http://localhost:3000/v1/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          Swal.fire({
            title: "تبریک",
            text: "دوره با موفقیت ایجاد شد",
            icon: "success",
          }).then(() => {
            getAllCourses();
          });
        } else {
          Swal.fire({
            title: "متاسفیم",
            text: "دوره ایجاد نشد",
            icon: "error",
          });
        }
      });
    }
  };
  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن محصول جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام محصول</label>
                <Input
                  type="text"
                  className="login-form__password-input"
                  element="input"
                  onInputHandler={onInputHandler}
                  id="name"
                  placeholder="لطفا نام محصول را وارد کنید..."
                  validations={[minValidator(5)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت محصول</label>
                <Input
                  type="text"
                  className="login-form__password-input"
                  element="input"
                  onInputHandler={onInputHandler}
                  id="price"
                  placeholder="لطفا قیمت محصول را وارد کنید..."
                  validations={[minValidator(5)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">نام کوتاه محصول</label>
                <Input
                  type="text"
                  className="login-form__password-input"
                  element="input"
                  onInputHandler={onInputHandler}
                  id="shortName"
                  placeholder="لطفا نام کوتاه محصول را وارد کنید..."
                  validations={[minValidator(5)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات محصول</label>
                <Input
                  type="text"
                  className="login-form__password-input"
                  element="input"
                  onInputHandler={onInputHandler}
                  id="description"
                  placeholder="لطفا توضیحات محصول را وارد کنید..."
                  validations={[minValidator(5)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">پشتیبانی محصول</label>
                <Input
                  type="text"
                  className="login-form__password-input"
                  element="input"
                  onInputHandler={onInputHandler}
                  id="support"
                  placeholder="لطفا نحوه پشتیبانی محصول را وارد کنید..."
                  validations={[minValidator(5)]}
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس محصول</label>
                <input
                  type="file"
                  id="file"
                  className="login-form__password-input"
                  onChange={(e) => setCourseCover(e.target.files[0])}
                />
              </div>
            </div>
            <div class="col-12">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={selectCategory}>
                  <option value="-1">انتخاب دسته بندی</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-6">
              <div class="presell">
                <label class="input-title">وضعیت دوره</label>
                <div class="radios">
                  <div class="presell-true">
                    <label>
                      <span>پیش فروش</span>
                      <input
                        type="radio"
                        value="presell"
                        name="presell"
                        checked={courseStatus === "presell"}
                        onChange={(e) => setCourseStatus(e.target.value)}
                      />
                    </label>
                  </div>
                  <div class="presell-false">
                    <label>
                      <span>در حال برگزاری</span>
                      <input
                        type="radio"
                        value="start"
                        name="presell"
                        checked={courseStatus === "start"}
                        onChange={(e) => setCourseStatus(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div class="submit-btn btn" onClick={createNewCourse}>
                <input type="submit" value="افزودن" />
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دوره ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>دسته بندی</th>
              <th>مبلغ</th>
              <th>وضعیت برگذاری</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {Courses &&
              Courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.categoryID}</td>
                  <td>{course.price == 0 ? "رایگان" : course.price}</td>
                  <td>{course.isComplete ? "تکمیل شده" : "درحال برگذاری"}</td>
                  <td>{course.shortName}</td>
                  <td>{course.creator}</td>

                  <td>
                    <button type="button" class="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger delete-btn"
                      onClick={() => deleteCourse(course._id)}
                    >
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
