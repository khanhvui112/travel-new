import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import blogService from '../../../services/blogsService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function AddBlog() {
    const formik = useFormik({
        initialValues:{
          title: '',
          detailSummary:'',
          file:null,
          detail:''
        },
        validationSchema:Yup.object({
          title: Yup.string()
          .required('Vui lòng nhập tiêu đề'),
          detailSummary: Yup.string()
          .required("Vui lòng tóm tắt chi tiết"),
          file: Yup.mixed().required("Vui lòng chọn ảnh"),
          detail: Yup.string()
          .required("Vui lòng mô tả"),
        }),
        onSubmit: (values,{ resetForm }) =>{
            handleCreate(values)
            alert("Thêm mới thành công")
            window.location.reload();
                      
        },
      });    
 
    const handleCkEditor = (event, editor) => {
        formik.setFieldValue("detail",editor.getData())
     }


     const handleCreate= (data)=>{
       const FormData = require('form-data');
       const tourData = new FormData();
       tourData.append('title', data.title);
       tourData.append('detailSummary', data.detailSummary);
       tourData.append('detail',data.detail);
       Array.from( data.file).forEach(file => {
        tourData.append('file', file);
      });
       
      
      const create = async (data)=>{
        await blogService.createBlog(data);    
       }
       try{
          create(tourData);
                  
       }catch(error) {
           console.log("Fail call api "+error);
           }
      }
  return (
<>
    <div className="container">
    <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
        <h2>Thêm mới bài viết</h2>
            <label htmlFor="exampleInputEmail1">Tên tiêu đề </label>
            <input type="input" id="title" name="title" className="title form-control" 
                {...formik.getFieldProps("title")}
                     />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.title&&formik.errors?.title}</span></div>
                
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Tóm tắt chi tiết</label>
            <input type="input" id="detailSummary" name="detailSummary" className="title form-control"
                {...formik.getFieldProps("detailSummary")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.detailSummary&&formik.errors?.detailSummary}</span></div>       
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Chọn ảnh</label>
            <input type="file" id="file"  name="file" className="form-control-file" 
                onChange={(event) =>{formik.setFieldValue("file",event.target.files)}}  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.file&&formik.errors?.file}</span></div>
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Mô tả</label>
            
            <CKEditor 
                editor={ClassicEditor}
                name = "detail"
                id   = "detail"
                onReady={ editor =>{
                }
              }
              onChange={handleCkEditor} 
             
                />  
              <div  className="input-group"><span className="text-center text-danger">{formik.touched.detail&&formik.errors?.detail}</span></div>           
        </div>           
        <button type="submit" className="btn btn-primary btn-submit">Submit</button>
    </form>  
    </div>
    
    </>
  )

}

export default AddBlog
