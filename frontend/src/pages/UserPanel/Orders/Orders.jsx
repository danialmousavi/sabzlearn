import React, { useEffect, useState } from 'react'
import  './Orders.css'
import {Link} from 'react-router-dom'
export default function Orders() {
  const [orders,setOrders]=useState([]);
  useEffect(()=>{
    const localStorageData=JSON.parse(localStorage.getItem('user'));
    fetch(`http://localhost:3000/v1/orders`,{
      headers:{
            Authorization: `Bearer ${localStorageData}`,
      }
    }).then(res=>res.json()).then(data=>{
      console.log(data);
      setOrders(data)
    }
    )
  },[])
  return (
    <>
        <div class="col-9">
      <div class="order">
        <table class="order__table">
          <thead class="order__table-header">
            <tr class="order__table-header-list">
              <th class="order__table-header-item">شناسه</th>
              <th class="order__table-header-item">تاریخ</th>
              <th class="order__table-header-item">وضعیت</th>
              <th class="order__table-header-item">دوره</th>
              <th class="order__table-header-item">مبلغ</th>
              <th class="order__table-header-item">عملیات ها</th>
            </tr>
          </thead>
          <tbody class="order__table-body">
            {orders.map((order, index) => (
              <tr class="order__table-body-list">
                <td class="order__table-body-item">
                  <a href="#" class="order__table-body-link">
                    {index + 1}
                  </a>
                </td>
                <td class="order__table-body-item">{order.createdAt.slice(0, 10)}</td>
                <td class="order__table-body-item">تکمیل شده</td>
                <td class="order__table-body-item">
                 {order.course.name}
                </td>
                <td class="order__table-body-item">
                 {order.course.price}
                </td>
                <td class="order__table-body-item" >
                  <Link class="order__table-body-btn" to={order._id} >
                    نمایش
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}
