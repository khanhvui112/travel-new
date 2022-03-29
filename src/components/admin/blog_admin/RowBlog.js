import React, {useEffect,useRef} from 'react';
import utils from '../../../common/utils';
import blogService from '../../../services/blogsService';
import constant from '../../../constants/constant';
import FormBlog from './FormBlog';

function RowBlog({blogUpdate,blog,handleDelete,handleUpdate,id,executeUpdate,isUpdate,updateBlog}) {

    const elementRef = useRef();
     
     useEffect(() => {
      const divElement = elementRef.current;
      divElement.innerHTML =blog.detail
     }, [blog])
     
    const deleteBlog = async (id)=>{
        try {
            await blogService.removeBlog(id); 
            handleDelete(); 
        } catch(err) {
            console.log(err);
        }                
    }

    

    const excuteUpdate = (event) => {
      
        localStorage.removeItem("id_blog");
        let id = event.target.getAttribute("data");
        localStorage.setItem("id_blog",id);
        handleUpdate(parseInt(id))  
 
         
    }

    const excuteDelete = (event) => {
      const answer = window.confirm("bạn thật sự muốn xóa");
    if (answer) {
      let id = event.target.getAttribute("data");
      deleteBlog(id);
      
  }     
        
    }      
    return (
        <tr>
            <td>{blog.id}</td>
            <td>{blog.title}</td>
            <td>{blog.detailSummary}</td>  
            <td ref={elementRef} id="blog-detail" className="row-clamp"></td>        
            <td><div className="center-blog"><img className="image-columm" src= {constant.IMAGE_BLOG+blog.image} alt={blog.title}/></div></td>         
            <td>{utils.getTime(blog.createDate)+"  "+utils.convertDateTime(blog.createDate) }</td>      
            <td>
            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
            <FormBlog elementRef={elementRef} blogUpdate={blogUpdate} updateBlog={updateBlog} executeUpdate={executeUpdate} isUpdate={isUpdate} id={blog.id} blogById={blog} />
            </div>
             
          </div>
        </div>
      </div>                 
                <button  data={blog.id} type="button" id={id} className="btn btn-primary"  data-toggle="modal" data-target=".bd-example-modal-lg" onClick={excuteUpdate}>Update</button>
                <button  data={blog.id} type="button" className="btn btn-danger" onClick={excuteDelete}>Delete</button>
            </td>
        </tr>
        
    )
}

export default RowBlog
