import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import tourService from '../../../services/TourService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function AddNew() {
    const formik = useFormik({
        initialValues:{
          title: '',
          price:'',
          totalDay:'',
          totalPerson:'',
          departure:'',
          file:null,
          detail:''


        },
        validationSchema:Yup.object({
          title: Yup.string()
          .required('Vui lòng nhập tiêu đề'),
          price: Yup.number()
          .integer("Vui lòng nhập giá số nguyên dương")
          .required("Vui lòng nhập giá")
          .typeError("Vui lòng nhập đúng định dạng là số"),
          totalDay: Yup.string()
          .required("Vui lòng nhập số ngày"),
          totalPerson: Yup.string()
          .required("Vui lòng nhập tổng số người"),
          departure: Yup.string()
          .required("Vui lòng địa điểm xuất phát"),
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
       tourData.append('price', data.price);
       tourData.append('totalDay', data.totalDay);
       tourData.append('detail',data.detail);
       tourData.append('totalPerson',data.totalPerson);
       tourData.append('departure',data.departure);
       Array.from( data.file).forEach(file => {
        tourData.append('files', file);
      });
       
      
      const create = async (data)=>{
        await tourService.create(data);    
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
        <h2>Thêm mới Tour</h2>
            <label htmlFor="exampleInputEmail1">Tên </label>
            <input type="input" id="title" name="title" className="title form-control" 
                {...formik.getFieldProps("title")}
                     />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.title&&formik.errors?.title}</span></div>
            
            
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Giá</label>
            <input type="input" id="price" name="price" className="title form-control"
                {...formik.getFieldProps("price")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.price&&formik.errors?.price}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Tổng số ngày</label>
            <input type="input" id="totalDay" name="totalDay" className="title form-control"
                {...formik.getFieldProps("totalDay")} 
                   />
                <div  className="input-group"><span className="text-center text-danger">{formik.touched.totalDay&&formik.errors?.totalDay}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Tổng số người</label>
            <input type="input" id="totalPerson" name="totalPerson" className="title form-control"
                {...formik.getFieldProps("totalPerson")} 
                  />
                <div  className="input-group"><span className="text-center text-danger">{formik.touched.totalPerson&&formik.errors?.totalPerson}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Điểm xuất phát</label>
            <input type="input" id="departure"  name="departure" className="title form-control"
                {...formik.getFieldProps("departure")} 
                  />
                <div  className="input-group"><span className="text-center text-danger">{formik.touched.departure&&formik.errors?.departure}</span></div>       
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Chọn ảnh</label>
            <input type="file" id="file"  name="file" className="form-control-file" multiple="multiple"
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
export default AddNew
