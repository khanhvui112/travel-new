import React from 'react'
import ReactPaginate from 'react-paginate'
 

function Pagination({ onClick, totalPage }) {
    const handlePageClick=(data)=>{
           let numberPage = data.selected;
            onClick(numberPage+1);
            window.scrollTo(0, 0); 
    }
   
    
    return (
        <div className="post-pagination">
        <ReactPaginate
       
        nextLabel={<span ><i className="fa fa-angle-right" /></span>}
        previousLabel={<span><i className="fa fa-angle-left"></i></span>}
        breakLabel="..."  
        pageCount={totalPage}
        marginPagesDisplayed={2}  
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        activeClassName={'active'}
        renderOnZeroPageCount={null}
      />             
        </div>
    )
}

export default Pagination
