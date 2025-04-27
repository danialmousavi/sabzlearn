import React, { useEffect, useState } from 'react'
import './Pagination.css'
import { Link, useParams } from 'react-router'
export default function Pagination({items,itemCount, pathName,setShownCourses}) {
  const {page}=useParams();
  const [pageCount,setPageCount]=useState(null);
  useEffect(()=>{
    let endIndex=itemCount*page;
    let startIndex=endIndex-itemCount;
    let paginatedItem=items.slice(startIndex , endIndex);
    setShownCourses(paginatedItem);

    let pageNumber=Math.ceil(items.length/itemCount);
    setPageCount(pageNumber)
  },[page,items])
  return (
    <div className="courses-pagination">
    <ul className="courses__pagination-list">
    {
      pageCount&&[...Array(pageCount)].map((_,index)=>(
        <li className="courses__pagination-item">
        <Link to={`${pathName}/${index+1}`} className={`courses__pagination-link ${page==index+1?'courses__pagination-link--active':""}`}>
          {index+1}
        </Link>
      </li>
      ))
    }



    </ul>
  </div>
  )
}

// {pageCount && [...Array(pageCount)].map((_,index)=>(
//   <li key={index} className="courses__pagination-item">
//     <Link to={`${pathName}/${index+1}`} className={`courses__pagination-link ${page==index+1?"courses__pagination-link--active":""}`} >
//       {index+1}
//     </Link>
//   </li>
// ))}