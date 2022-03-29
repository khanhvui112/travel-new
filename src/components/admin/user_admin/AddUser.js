import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import userService from '../../../services/userService'
import authentication from '../../../services/athenticationService'
 

export default function AddUser() {


    const formik = useFormik({
        initialValues:{
          email:'',
          name: '',
          password:'',
          role:null,
        },
        validateOnChange:false,
        validateOnBlur:false,
        validationSchema:Yup.object({
          email: Yup.string()
          .email('Email sai định dạng')
          .required("Vui lòng địa chỉ email")
          .test('Unique Email', 'Email đã được sử dụng', // <- key, message
                function (value) {
                  const data = JSON.stringify({
                    "email": value
                  });
                  const exitsEmail = async (user)=>{
                    try{
                      const response= await authentication.exitsEmail(user);   
                      if(response.status===200) {
                        return true;
                      }else
                      return false;
                      
                    }catch(error){
                      return false;
                    }
                }
                return exitsEmail(data)
                }
            ),        
          name: Yup.string()
          .required('Vui lòng nhập tên'),
          role: Yup
          .number()
          .nullable()
          .required("Vui lòng chọn quyền"),
          password: Yup.string()
          .min(8,'Mật khẩu tối thiểu 8 kí tự')
          .required("Vui lòng nhập mật khẩu"),
        }),
        onSubmit: (values,{ resetForm }) =>{
            handleCreate(values)
                 
        },
      });    
 
 


     const handleCreate= (data)=>{
      var FormData = require('form-data');
      const userData = new FormData();
      userData.append('name', data.name);
      userData.append('email', data.email);
      userData.append('password', data.password);
      const newArray = data.role.map(str => {
        return Number(str);
      });
      userData.append('idRole', newArray);
     
      
      const create = async (data)=>{
        await userService.create(data);    
        alert("Thêm mới thành công") 
        window.location.reload()
        
       }
        try{
         create(userData);            
        }catch(error) {
            console.log("Fail call api "+error);
            }
      }
  return (
    <>
    <div className="container">
    <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
        <h2>Thêm mới người dùng</h2>
            <label htmlFor="exampleInputEmail1">Tên người dùng</label>
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
            <label htmlFor="exampleFormControlTextarea1">Mật khẩu</label>
            <input type="password" id="password" name="password" className="title form-control"
                {...formik.getFieldProps("password")} 
                  />
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.password&&formik.errors?.password}</span></div>       
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Chọn quyền người dùng</label>
            <select id="role" name="role" class="form-select" multiple aria-label="Default select example" {...formik.getFieldProps("role")} >
            
            <option value="1">User</option>
            <option value="3">Admin</option>
            
            </select>
            <div  className="input-group"><span className="text-center text-danger">{formik.touched.role&&formik.errors?.role}</span></div>
        </div>
           
        <button type="submit" className="btn btn-primary btn-submit">Submit</button>
    </form>  
    </div>
    
    </>
  )
}
