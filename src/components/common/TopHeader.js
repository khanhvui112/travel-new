import React, { useState } from "react"
import { Link } from "react-router-dom"
import {useFormik} from 'formik'
import * as Yup from 'yup'
import authentication from '../../services/athenticationService'

function TopHeader() {
  const [statusForm, setStatusForm] = useState(false);
  const [status, setStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("accessToken")!=null);
 


  const handleStatus = ()=>{
    setStatus(!status);
  }
  const handleForm = ()=>{
    setStatusForm(true);
    setStatus(false)
  }
  
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
      document.getElementById("error").style.display="block";
      resetForm();
      loginForm(values);
      
    },
  });

  const formikRegister = useFormik({
    initialValues:{
      email: '',
      password:'',
      name:'',
      passwordConfirmation:''
      
    },
    validateOnChange:false,
    validateOnBlur:false,
    validationSchema:Yup.object({

      email: Yup.string()
      .max(100,"Yêu cầu nhập đúng dữ liệu")
      .required('Vui lòng nhập email')
      .email('Email sai định dạng')
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
      .required("Vui lòng nhập tên"),
      password: Yup.string()
      .required("Vui lòng nhập mật khẩu"),
      passwordConfirmation: Yup.string()
      .required("Vui lòng nhập lại mật khẩu")
     .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
    }),
    onSubmit: (values,{ resetForm }) =>{
      document.getElementById("error").style.display="block";
      resetForm();
      handleCreate(values) 
    },
  },
  );
   

     

    const setParams =(event) => {
      formik.handleChange(event)
      document.getElementById("error").innerText=("")
    }
    const displayModel = ()=>{
      document.getElementById("exampleModal").style.display="none";
      const elements=document.querySelectorAll(".modal-backdrop.fade.show");
      elements.forEach(element=>element.style.display="none");
    }
    const login = async (user)=>{
      try{
        const response= await authentication.login(user);   
        localStorage.setItem("accessToken",response.data);
        localStorage.setItem("user",user.get("email"));
        setIsLogin(localStorage.getItem("accessToken")!=null);
        displayModel();
        window.location.reload(true); 
      }catch(error){
        console.log("go erro");
        setIsLogin(true);
        document.getElementById("error").innerText=("Thông tin tài khoản mật khẩu không đúng");
        setTimeout(()=>{
          document.getElementById("error").innerText=("");
        }, 1000)

        console.log(error);
      }
    
  }
    const loginForm = (user) =>{
      console.log(user)
      const FormData = require('form-data');
      const userData = new FormData();
      userData.append('email', user.email);
      userData.append('password', user.password);
      login(userData);            
    }
  
 
  const logout = ()=>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLogin(localStorage.getItem("accessToken")!=null);
           
  }
  const handleCreate= (data)=>{
    console.log(data)
   const FormData = require('form-data');
   const tourData = new FormData();
   tourData.append('email', data.email);
   tourData.append('password', data.password);
   tourData.append('name',data.name);
   
  const createMember = async (data)=>{
    await authentication.createMember(data);   
    loginForm({'email':data.get('email'), 'password':data.get('password')});  
}
   try{
    createMember(tourData);  
         
   }catch(error) {
       console.log("Fail call api "+error);
       }
  }

 

 

  return (
    <div className="topbar-one">
      <div className="container-fluid">
        <div className="topbar-one__left">
          <a href="ngocmeu2000@gmail.com">
            Email: ngocmeu2000@gmail.com
          </a>
          <a href="tel:Tel: 0210.3846.390">Tel: 0210.3846.390</a>
        </div>
        <div className="topbar-one__right" />
        <div className="main-nav__right">
           
         {isLogin?(<span className="logout"  onClick={logout}>Logout</span>):""} 
          
           {
             !isLogin? (<span   className="main-nav__login login-popup__toggler login" data-toggle="modal" data-target="#exampleModal" onClick={handleForm} >
            <i className="fal fa-user" />
          </span>):(<div className="user"><span className="name_user">{localStorage.getItem("user")}</span></div>)
          }
          
         
        {statusForm&&(        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
            
          {!status?(  <div> <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Đăng nhập</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Email</label>
          <input type="email"   id="email" className="form-control" 
            onChange={()=>setParams}
            {...formik.getFieldProps("email")}           
            />
        <div  className="input-group"><span className="text-center text-danger">{formik.touched.email&&formik.errors?.email}</span></div>
        </div>
        
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">Password</label>
          <input type="password" id="password" className="form-control" name="password" autocomplete="email"
            onChange={setParams}
            {...formik.getFieldProps("password")} 
            />
        <div className="input-group"><span className="text-center text-danger">{formik.touched.password&&formik.errors?.password}</span></div>
        </div>
        <div  className="input-group"><span id="error" className="text-center text-danger"></span></div>
        
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" defaultValue id="form2Example34" defaultChecked  />
              <label className="form-check-label" htmlFor="form2Example34"> Remember me </label>
            </div>
          </div>
          <div className="col">
            {/* Simple link */}
            <Link to="/vi/reset-password/">Forgot password?</Link>
          </div>
        </div>
        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block mb-4 btn-login">Sign in</button>
        {/* Register buttons */}
        <div className="text-center">
          <p>Not a member? <Link to="" onClick={handleStatus}>Register</Link></p>
           
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-facebook-f" />
          </button>
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-google" />
          </button>
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-twitter" />
          </button>
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-github" />
          </button>
        </div>
      </form>
              </div></div>):(<div>            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Đăng kí</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <form onSubmit={formikRegister.handleSubmit}>
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Email </label>
          <input type="email"   id="email" className="form-control" 
            onChange={()=>setParams}
            {...formikRegister.getFieldProps("email")}           
            />
        <div  className="input-group"><span className="text-center text-danger">{formikRegister.touched.email&&formikRegister.errors?.email}</span></div>
        </div>
        
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">Tên</label>
          <input type="text" id="name" className="form-control" 
            onChange={setParams}
            {...formikRegister.getFieldProps("name")} 
            />
        <div className="input-group"><span className="text-center text-danger">{formikRegister.touched.name&&formikRegister.errors?.name}</span></div>
        </div>
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">Mật Khẩu</label>
          <input type="password" id="password" className="form-control" 
            onChange={setParams}
            {...formikRegister.getFieldProps("password")} 
            />
        <div className="input-group"><span className="text-center text-danger">{formikRegister.touched.password&&formikRegister.errors?.password}</span></div>
        </div>
        
        <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">Nhập lại mật Khẩu</label>
          <input type="password" id="passwordConfirmation" className="form-control" 
            onChange={setParams}
            {...formikRegister.getFieldProps("passwordConfirmation")} 
            />
        <div className="input-group"><span className="text-center text-danger">{formikRegister.touched.passwordConfirmation&&formikRegister.errors?.passwordConfirmation}</span></div>
        </div>
        <div  className="input-group"><span id="error" className="text-center text-danger"></span></div>
        
        
    
        <button type="submit" className="btn btn-primary btn-block mb-4 btn-login">Register</button>
        <div className="text-right" onClick={()=>setStatus(false)}><Link to="">Back to login</Link></div>
        <div className="text-center">
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-facebook-f" />
          </button>
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-google" />
          </button>
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-twitter" />
          </button>
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fab fa-github" />
          </button>
        </div>
      </form>
              </div></div>)}
              
            </div>
          </div>


        </div>)}
         

      </div>
        </div>
      </div>
     
  );
}

export default TopHeader;
