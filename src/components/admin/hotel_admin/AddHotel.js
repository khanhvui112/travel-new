import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import hotelService from '../../../services/hotelService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function AddHotel() {
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
          .required('Vui lòng nhập tên địa điểm'),
          phone: Yup.string()
          .required("Vui lòng nhập số điện thoại")
          .matches(phoneRegExp, 'Yêu cầu nhập đúng số điện thoại'),
          address: Yup.string()
          .required("Vui lòng địa chỉ điểm du lịch"),
          email: Yup.string().email("Email không đúng định dạng")
          .required("Vui lòng nhập email"),
          urlWeb: Yup.string()
          .required("Vui lòng nhập địa chỉ Website"),
          rate: Yup.number()
          .integer("Vui lòng nhập giá số nguyên dương")
          .required("Vui lòng nhập đánh giá sao")
          .typeError("Vui lòng nhập đúng định dạng là số"),
          price: Yup.number()
          .integer("Vui lòng nhập giá số nguyên dương")
          .required("Vui lòng nhập giá")
          .typeError("Vui lòng nhập đúng định dạng là số"),
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
      const hotelData = new FormData();
      hotelData.append('email',data.email);
      hotelData.append('phone',data.phone);
      hotelData.append('rate',data.rate); 
      hotelData.append('urlWeb',data.urlWeb); 
      hotelData.append('name', data.name);
      hotelData.append('address', data.address);
      hotelData.append('price', data.price);
      Array.from( data.file).forEach(file => {
        hotelData.append('file', file);
      });
      hotelData.append('detail', data.detail);
     
      
      const create = async (data)=>{
        await hotelService.create(data);    
       }
        try{
         create(hotelData);   
        }catch(error) {
            console.log("Fail call api "+error);
            }
      }
  return (
    <>
    <div className="container">
    <div className="modal fade bd-example-modal-lg add-new-blog" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title " id="exampleModalLabel">Modal title</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
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
         
      </div>
    </div>
  </div>  

    <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
        <h2>Thêm mới Khách sạn</h2>
            <label htmlFor="exampleInputEmail1">Tên khách sạn</label>
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
            <label htmlFor="exampleFormControlTextarea1">Email</label>
            <input type="input" id="email" name="email" className="title form-control"
                {...formik.getFieldProps("email")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.email&&formik.errors?.email}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">website</label>
            <input type="input" id="urlWeb" name="urlWeb" className="title form-control"
                {...formik.getFieldProps("urlWeb")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.urlWeb&&formik.errors?.urlWeb}</span></div>       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Xếp loại sao</label>
            <input type="input" id="rate" name="rate" className="title form-control"
                {...formik.getFieldProps("rate")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.rate&&formik.errors?.rate}</span></div>       
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

export default AddHotel
