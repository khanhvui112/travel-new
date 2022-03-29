import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Login.css'
import {useFormik} from 'formik'
import * as Yup from 'yup'
 
function Login() {
  const formik = useFormik({
    initialValues:{
      email: '',
      password:'',
    },
    validationSchema:Yup.object({
      email: Yup.string()
      .max(100,"Yêu cầu nhập đúng dữ liệu")
      .required('Vui lòng nhập email')
      .email('Email sai định dạng'),
      password: Yup.string()
      .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values,{ resetForm }) =>{
      console.log(values);
      handle();
      resetForm();
      login(values);
    },
  });
  const handle = ()=>{
    console.log("da submit");
  }
     


    const login = (user) =>{
        var axios = require('axios');
        var data = JSON.stringify({
          "email": user.email,
          "password": user.password
        });
        
        var config = {
          method: 'post',
          url: 'http://159.223.41.207:8080/api/login',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(response.data);
          localStorage.setItem("accessToken",response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  

    return (
        
        
        <div id="login">
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form" onSubmit={formik.handleSubmit} >
                  <h3 className="text-center text-info">Login</h3>


                  <div className="form-group">
                    <label htmlFor="username" className="text-info">Username:</label><br />
                    <input type="text" id="email" className="form-control" 
                      
                      {...formik.getFieldProps("email")} 

                    />
                  </div>
                  <div className="input-group"><span className="text-center text-danger">{formik.touched.email&&formik.errors?.email}</span></div>

                  <div className="form-group">
                    <label htmlFor="password" className="text-info">Password:</label><br />
                    <input type="text" id="password" className="form-control"  />
                  </div>
                  <div className="input-group"><span className="text-center text-danger">{formik.touched.password&&formik.errors?.password}</span></div>

                  
                  <div className="form-group text-right" >
                    <label htmlFor="remember-me" className="text-info"><span>Remember me</span>&nbsp;<span><input id="remember-me" name="remember-me" type="checkbox" /></span></label><br />
                    <input type="submit" name="submit" className="btn btn-info btn-md" defaultValue="submit"/>
                  </div>
                  <div id="register-link" className="text-right">
                    <Link to="/vi/register" className="text-info">Register here</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login
