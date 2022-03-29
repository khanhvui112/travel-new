import React from 'react'
import ReactPaginate from 'react-paginate'

function PaginationTable({onClick, totalPage}) {
    
    const handlePageClick=(data)=>{
        let numberPage = data.selected;
         onClick(numberPage+1);
 }
    return (
        <ul className="pagination">
            <ReactPaginate
                nextLabel={<span className="page-item"><span className="page-link" >Next</span></span>}
                previousLabel={<span className="page-item"><span className="page-link">Previous</span></span>}
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
        </ul>        
    )
}

export default PaginationTable
