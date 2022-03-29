import React, { useEffect, useState } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import blogService from '../../../services/blogsService'


function FormBlog({id,isUpdate,updateBlog}) {  
     
    const [blog, setBlog] = useState({"title":"","detailSummary":"","file":null});
    const [detail,setDtail] = useState("");

    const getBlogById = async (id)=>{
      try {
          const response= await blogService.get(id);
          if(response.data.success) {
            setBlog(response.data.data);
            updateBlog(response.data.data);
              }           
      } catch(err) {
          console.log(err);         
      }     
  }

     useEffect(() => {
        getBlogById(localStorage.getItem('id_blog'));
     },[id,isUpdate])
     
    
    

  const setParams = (event) => {
    if(event.target.name!=="file"){
      setBlog({...blog,[event.target.name]:event.target.value});
    }else{
      setBlog({...blog,[event.target.name]:event.target.files[0]});
    }  
}
  const handleCkEditor = (event,editor) => {
     setDtail(editor.getData());
  }


  const handleSubmit = (event) => {
     
     
    var FormData = require('form-data');
    const data = new FormData();
    data.append('title', blog.title);
    data.append('detailSummary', blog.detailSummary);
    data.append('file', blog.file);
    data.append('detail', detail);
    const update = async (id,data)=>{
      await blogService.update(id,data);    
  }  
    try{
      document.location.reload(true); 
      update(localStorage.getItem('id_blog'),data); 
      alert("Sửa thành công") 
      document.location.reload(true); 
    }catch(error) {
          console.log("Fail call api "+error);
      }
      
 
     
    }
    return (
        <form>
            <div className="form-group">
            <h2>cập nhật bài viết {localStorage.getItem('id_blog')}</h2>
                <label htmlFor="exampleInputEmail1">Tiêu đề</label>
                <input type="input" name="title" className="title form-control" onChange={setParams} value={blog.title}    />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1"> Tóm tắt chi tiết</label>
                <textarea className="form-control" name="detailSummary"  rows={3}  onChange={setParams} value={blog.detailSummary}    />       
            </div>
            <div className="form-group">    
                <label htmlFor="exampleFormControlFile1">Chọn ảnh</label>
                <input type="file" name="file" className="form-control-file" onChange={setParams} />
            </div>
            <div className="form-group">    
                <label htmlFor="exampleFormControlFile1">Mô tả</label>
                <CKEditor 
                    name = "detail"
                    editor={ClassicEditor}
                    onReady={ editor =>{
                    }
                  }
                  onChange={handleCkEditor}
                  data={blog.detail}
                    />
            </div>           
            <button type="button" className="btn btn-primary btn-submit" onClick={handleSubmit}>Submit</button>
          </form>
    )
}

export default FormBlog
