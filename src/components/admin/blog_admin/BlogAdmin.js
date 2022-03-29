import React, { useEffect } from 'react'
import blogsService from '../../../services/blogsService'
import { useState } from 'react'
import UpdateBlog from './UpdateBlog'
import AddBlog from './AddBlog'
 

function BlogAdmin() {
  //phân trang
  const [blogs,setBlogs] = useState({});
  const [page,setPage]=useState(1);
  const [blogUpdate,setBlogUpdate] = useState({"title":"","detail":"","detailSummary":"","file":null});

  const updateBlog =(blog)=>{
    setBlogUpdate(blog)
  }

  //cập nhật
  const [idUpdate,setIdUpdate] = useState(0);
  const [isDelete,setIsDelete] = useState(false);
  const [isUpdate,setIsUpdate] = useState(false);
 
  const executeUpdate = ()=>{
    setIsUpdate(!isUpdate);
  }
  //phân trang
  const increment = (indexPage) => {
    setPage(indexPage)
  }
    const fethApi = async (page)=>{
      const response= await blogsService.getByPage(page);    
      setBlogs(response.data);
  }
    useEffect( ()=>{
        try{
            fethApi(page);
        }
        catch(err){
            console.log("Fail call api "+err);
      } 
    },[page,isDelete,isUpdate,blogUpdate])

  //xử lí delete
  const handleDelete = ()=>{
    setIsDelete(!isDelete);
}

  //xử lí update
  const handleUpdate = (id)=>{
    setIdUpdate(id);
  }


 

 
 
         
    return (
        <div className="container">              
          <AddBlog/>
          <UpdateBlog blogUpdate={blogUpdate} updateBlog={updateBlog} key={idUpdate}  isUpdate={isUpdate} executeUpdate={executeUpdate} handleUpdate={handleUpdate} handleDelete={handleDelete} increment={increment}  blogs={blogs} id={idUpdate} />
        </div>
        
    )
}

export default BlogAdmin


