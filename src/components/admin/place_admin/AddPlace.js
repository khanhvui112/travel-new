import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import placesService from '../../../services/placesService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function AddPlace() {
    const formik = useFormik({
        initialValues:{
          name: '',
          price:'',
          address:'',
          file:null,
          detail:''
        },
        validationSchema:Yup.object({
          name: Yup.string()
          .required('Vui lòng nhập tên địa điểm'),
          price: Yup.number()
          .integer("Vui lòng nhập giá số nguyên dương")
          .required("Vui lòng nhập giá")
          .typeError("Vui lòng nhập đúng định dạng là số"),
          address: Yup.string()
          .required("Vui lòng địa chỉ điểm du lịch"),
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
      var FormData = require('form-data');
      const placeData = new FormData();
      placeData.append('name', data.name);
      placeData.append('address', data.address);
      placeData.append('price', data.price);
      Array.from( data.file).forEach(file => {
          placeData.append('files', file);
      });
      placeData.append('detail', data.detail);
     
      
      const create = async (data)=>{
        await placesService.createPlace(data);     
       }
        try{
          create(placeData); 
          document.location.reload(true);   
        }catch(error) {
          console.log("Fail call api "+error);
            }
      }
  return (
    <>
    <div className="container">
    <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
        <h2>Thêm mới điểm du lịch</h2>
            <label htmlFor="exampleInputEmail1">Tên điểm du lịch</label>
            <input type="input" id="name" name="name" className="title form-control" 
                {...formik.getFieldProps("name")}
                     />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.name&&formik.errors?.name}</span></div>
            
            
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Địa điểm</label>
            <input type="input" id="address" name="address" className="title form-control"
                {...formik.getFieldProps("address")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.address&&formik.errors?.address}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Giá</label>
            <input type="input" id="price" name="price" className="title form-control"
                {...formik.getFieldProps("price")} 
                   />
                <div  className="input-group"><span className="text-center text-danger">{formik.touched.price&&formik.errors?.price}</span></div>       
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

export default AddPlace
