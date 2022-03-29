import React from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import postService from '../../../services/postsService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function AddIntroduce() {
    const formik = useFormik({
        initialValues:{
          title: '',
          file:null,
          detail:''
        },
        validationSchema:Yup.object({
        title: Yup.string()
        .required('Vui lòng nhập tên bài giới thiệu'),
        file: Yup.mixed().required("Vui lòng chọn ảnh"),
        detail: Yup.string()
        .required("Vui lòng mô tả bài giới thiệu"),
        }),
        onSubmit: (values,{ resetForm }) =>{
            handleCreate(values);
            alert("Thêm mới thành công");
            window.location.reload();  
       
        },
      });    
 
    const handleCkEditor = (event, editor) => {
        formik.setFieldValue("detail",editor.getData())
     }


     const handleCreate= (data)=>{
       const FormData = require('form-data');
       const introduceData = new FormData();
       introduceData.append('title', data.title);
       introduceData.append('detail',data.detail);
       Array.from( data.file).forEach(file => {
       introduceData.append('file', file);
      });
       
      
      const create = async (data)=>{
        await postService.create(data);    
       }
       try{
          create(introduceData);
                  
       }catch(error) {
           console.log("Fail call api "+error);
           }
      }
    return (
<>
    <div className="container">
    <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
        <h2 className="mt-12">Thêm bài giới thiệu mới</h2>
            <label htmlFor="exampleInputEmail1">Tên bài giới thiệu</label>
            <input type="input" id="title" name="title" className="title form-control" 
                {...formik.getFieldProps("title")}
                     />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.title&&formik.errors?.title}</span></div>
                
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Chọn ảnh</label>
            <input type="file" id="file"  name="file" className="form-control-file" 
                onChange={(event) =>{formik.setFieldValue("file",event.target.files)}}  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.file&&formik.errors?.file}</span></div>
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Mô tả </label>
            
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

export default AddIntroduce
