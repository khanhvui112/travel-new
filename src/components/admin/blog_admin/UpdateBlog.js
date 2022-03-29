import React from 'react';
import PaginationTable from '../../common/PaginationTable';
import RowBlog from './RowBlog';
 

function UpdateBlog({blogUpdate,isUpdate,handleUpdate,id,blogs,increment,handleDelete,executeUpdate,updateBlog}) {
     
        if(blogs.data !== undefined) {
    return (
    <div>
        <h2 className="title-add">Danh sách bài viết</h2>
        <div className="container ">
          <div className="row form">
            <div className="col-12">
               
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">tiêu đề</th>
                    <th scope="col">Tóm tắt chi tiết</th>
                    <th scope="col">Chi tiết</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Create date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="show_table"  >
                    { 
                        Array.from(blogs.data.pageRespDtos).map((blog,index) => {
                        return (                               
                                <RowBlog blogUpdate={blogUpdate} updateBlog={updateBlog} isUpdate={isUpdate} executeUpdate={executeUpdate} id={id} handleUpdate={handleUpdate}  key={index} handleDelete={handleDelete} totalPage={blogs.data.totalPage}    blog={blog} />                                
                            )
                        })
                    }                           
                </tbody>
              </table>
            <nav aria-label="Page navigation example">
                 <PaginationTable  onClick={increment} totalPage={blogs.data.totalPage}/>
            </nav>
            </div>
          </div>
        </div>
         
         
    </div>  
    )
    }else return "";
}

export default UpdateBlog
