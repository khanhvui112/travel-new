import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import restaurantService from '../../../services/RestaurantService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function AddRestaurant() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const formik = useFormik({
        initialValues:{
          name: '',
          phone:'',
          address:'',
          email:'',
          urlWeb:'',
          rate:'',
          price:'',
          file:null,
          detail:''
        },
        validationSchema:Yup.object({
          name: Yup.string()
          .required('Vui lòng nhập tên quán ăn'),
          phone: Yup.string()
          .required("Vui lòng nhập số điện thoại liên hệ")
          .matches(phoneRegExp, 'Yêu cầu nhập đúng số điện thoại'),
          address: Yup.string()
          .required("Vui lòng địa chỉ quán ăn"),
          file: Yup.mixed().required("Vui lòng chọn ảnh"),
          detail: Yup.string()
          .required("Vui lòng nhập mô tả chi tiết"),
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
      const restaurantData = new FormData();
      restaurantData.append('name', data.name);
      restaurantData.append('address', data.address);
      Array.from( data.file).forEach(file => {
        restaurantData.append('files', file);
      });
      restaurantData.append('phone',data.phone);
      restaurantData.append('detail', data.detail);
     
      const create = async (data)=>{
        await restaurantService.create(data);    
       }
        try{
         create(restaurantData);  
        }catch(error) {
            console.log("Fail call api "+error);
            }
      }
  return (
    <>
    <div className="container">
    <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
        <h2>Thêm mới quán ăn</h2>
            <label htmlFor="exampleInputEmail1">Tên quán ăn</label>
            <input type="input" id="name" name="name" className="title form-control" 
                {...formik.getFieldProps("name")}
                     />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.name&&formik.errors?.name}</span></div>
            
            
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Địa chỉ</label>
            <input type="input" id="address" name="address" className="title form-control"
                {...formik.getFieldProps("address")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.address&&formik.errors?.address}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Số điện thoại</label>
            <input type="input" id="phone" name="phone" className="title form-control"
                {...formik.getFieldProps("phone")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.phone&&formik.errors?.phone}</span></div>       
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Chọn ảnh</label>
            <input type="file" id="file"  name="file" className="form-control-file" multiple="multiple"
                onChange={(event) =>{formik.setFieldValue("file",event.target.files)}}  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.file&&formik.errors?.file}</span></div>
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Chi tiết</label>
            
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

export default AddRestaurant
