import React from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import agencyService from '../../../services/agencyService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function AddAgency() {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const formik = useFormik({
        initialValues:{
          name: '',
          email:'',
          phone:'',
          urlWeb:'',
          address:'',
          file:null,
          detail:''
        },
        validationSchema:Yup.object({
        email: Yup.string().email("Email không đúng định dạng")
        .required("Vui lòng nhập email"),
        urlWeb: Yup.string()
        .required("Vui lòng nhập địa chỉ Website"),
        phone: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(phoneRegExp, 'Yêu cầu nhập đúng số điện thoại'),
        name: Yup.string()
        .required('Vui lòng nhập tên lữ hành'),
        address: Yup.string()
        .required("Vui lòng địa chỉ lữ hành"),
        file: Yup.mixed().required("Vui lòng chọn ảnh"),
        detail: Yup.string()
        .required("Vui lòng mô tả"),
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
       const agencyData = new FormData();
       agencyData.append('name', data.name);
       agencyData.append('email', data.email);
       agencyData.append('phone', data.phone);
       agencyData.append('urlWeb', data.urlWeb);
       agencyData.append('address', data.address);
       agencyData.append('detail',data.detail);
       Array.from( data.file).forEach(file => {
        agencyData.append('file', file);
      });
       
      
      const create = async (data)=>{
         await agencyService.create(data);    
       }
       try{
          create(agencyData);
                  
       }catch(error) {
           console.log("Fail call api "+error);
           }
      }
    return (
<>
    <div className="container">
    <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
        <h2>Thêm lữ hành mới</h2>
            <label htmlFor="exampleInputEmail1">Tên lữ hành</label>
            <input type="input" id="name" name="name" className="title form-control" 
                {...formik.getFieldProps("name")}
                     />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.name&&formik.errors?.name}</span></div>
                
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Email</label>
            <input type="input" id="email" name="email" className="title form-control"
                {...formik.getFieldProps("email")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.email&&formik.errors?.email}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Số điện thoại</label>
            <input type="input" id="phone" name="phone" className="title form-control"
                {...formik.getFieldProps("phone")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.phone&&formik.errors?.phone}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Địa chỉ</label>
            <input type="input" id="address" name="address" className="title form-control"
                {...formik.getFieldProps("address")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.address&&formik.errors?.address}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">địa chỉ website </label>
            <input type="input" id="urlWeb" name="urlWeb" className="title form-control"
                {...formik.getFieldProps("urlWeb")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.urlWeb&&formik.errors?.urlWeb}</span></div>       
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

export default AddAgency
