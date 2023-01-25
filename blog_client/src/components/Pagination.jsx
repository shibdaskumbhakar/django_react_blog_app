import React, { useEffect } from 'react'
import './component.css'

const Pagination = (props) => {

  useEffect(()=>{
    console.log(props.data,'===============')
  },[props.data])

  const calculatePageNumber = (pageSize, itemIndex) => {
    return Math.ceil(++itemIndex / pageSize);
  };

  return (
    <div>
      <div id="container">
        <div id="pagination">
          <p className={props.data.links.previous ? 'blocks' : 'blocks desibled_previous'} onClick={() =>props.handlePagination(props.data.page-1)}>&laquo;</p>
          {[...Array(calculatePageNumber(props.data.page_size, props.data.total)).keys()].map((item, index) => {
            return(
              <p className= {index+1 === props.data.page ? 'blocks active' : 'blocks'} key={index} onClick={() =>props.handlePagination(index+1)} >{index+1}</p>
            )
          })}
          <p className= {props.data.links.next ? 'blocks' : 'blocks desibled_next'} onClick={() =>props.handlePagination(props.data.page+1)} >&raquo;</p>
        </div>
      </div>
    </div>
  )
}

export default Pagination

