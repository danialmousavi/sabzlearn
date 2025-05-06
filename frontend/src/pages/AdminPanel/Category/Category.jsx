import React, { useEffect, useState } from "react";
import DataTable from "../../../components/AdminPanel/DataTable/DataTable";

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
  useEffect(() => {
    getAllCategoies();
  }, []);
  return (
    <>
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
