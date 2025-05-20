import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import AuthContext from "../../../context/authContext";
export default function OrdersDetail() {
  const { detail } = useParams();
  const [courseDetail, setCourseDetail] = useState([]);
  const authContext=useContext(AuthContext);
  console.log(authContext);
  
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:3000/v1/orders/${detail}`, {
      headers: {
        Authorization: `Bearer ${localStorageData}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourseDetail(data[0]);
      });
  }, []);
  console.log(courseDetail);

  return (
    <>
      <div class="col-9">
        <div class="order">
          <p>
            سفارش در تاریخ{" "}
            <span className="detailStatus">
              {courseDetail.length !== 0 && courseDetail.createdAt.slice(0, 10)}
            </span>{" "}
            ثبت شده است و درحال حاضر در وضعیت{" "}
            <span className="detailStatus">
              {courseDetail.length !== 0 && courseDetail.course.isCompelete == 0
                ? "درحال برگذاری"
                : "تکمیل شده"}
            </span>{" "}
            میباشد
          </p>
          <h1 className="mt-5 courseDetail-header">مشخصات سفارش</h1>
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">محصول</th>
                <th>مجموع</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="col">{courseDetail.length !== 0 && courseDetail.course.name}</td>
                <td>1</td>
              </tr>
              <tr>
                <td scope="row">قیمت نهایی</td>
                <td >{courseDetail.length !== 0 &&courseDetail.course.price}</td>
              </tr>
            </tbody>
          </table>
          <Link to={`/my-account/orders`} className="order__table-body-btn">بازگشت</Link>
          <h1 className="mt-5 courseDetail-header">آدرس صورتحساب</h1>
          <p>{authContext.userInfo&&authContext.userInfo.name}</p>
          <p>{authContext.userInfo&&authContext.userInfo.phone}</p>
          <p>{authContext.userInfo&&authContext.userInfo.email}</p>
          
        </div>
      </div>
    </>
  );
}
