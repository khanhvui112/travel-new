import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import path from "../../constants/constant.js"
import postsService from '../../services/agencyService'
 
 
 

function Navbar() {
  const[introduces,setIntroduces] = useState();
  const fethApi = async ()=>{
    const response= await postsService.getAll();    
    setIntroduces(response.data.data);
}
  useEffect( ()=>{
      try{
          fethApi();
      }
      catch(err){
          console.log("Fail call api "+err);
    } 
  },[])
   
   const [status,setStatus] = useState(false);
   const handleClick = ()=>{
      setStatus(!status);
   }
    return (
 
        
        <header className="main-nav__header-one">
        <nav className="header-navigation stricky original">
          <div className="container">
            <div className="main-nav__logo-box">
              <Link to="/vi" className="main-nav__logo">
                <img src={path.LOGO} className="main-logo" width="123px" alt="Cổng thông tin du lịch Phú Thọ" /></Link>
              <span className="side-menu__toggler"><i className="fa fa-bars" onClick={handleClick} /></span>
            </div>
            <div id="navbar-header-computer" className="main-nav__main-navigation">
              <ul  className="main-nav__navigation-box">
                <li><Link  to="/vi"  >TRANG CHỦ</Link></li>
                <li><Link to="/vi/introduces/detail/1">GIỚI THIỆU</Link></li>
                <li><Link to="/vi/places"  >ĐIỂM DU LỊCH</Link></li>
                <li><Link to="/vi/tours"  >TOUR DU LỊCH</Link></li>
                <li><Link to="/vi/blogs" >TIN TỨC</Link></li>
                <li><Link to="/vi/hotels"  >LƯU TRÚ</Link></li>
                <li><Link to="/vi/agencies"  >LỮ HÀNH</Link></li>
                <li><Link to="/vi/restaurants"  >ẨM THỰC</Link></li>
              </ul>
            </div>
            {status&&(<div id="navbar-header-mobie" className=" mobie main-nav__main-navigation">
              <ul id="menu-mobie"  className="main-nav__navigation-box">
                <li><Link  to="/vi" onClick={handleClick}  >TRANG CHỦ</Link></li>
                <li><Link to={`/vi/introduces/detail/${introduces[0].id}`} onClick={handleClick}>GIỚI THIỆU</Link></li>
                <li><Link to="/vi/places" onClick={handleClick}  >ĐIỂM DU LỊCH</Link></li>
                <li><Link to="/vi/tours" onClick={handleClick}  >TOUR DU LỊCH</Link></li>
                <li><Link to="/vi/blogs" onClick={handleClick} >TIN TỨC</Link></li>
                <li><Link to="/vi/hotels" onClick={handleClick}  >LƯU TRÚ</Link></li>
                <li><Link to="/vi/agencies" onClick={handleClick}  >LỮ HÀNH</Link></li>
                <li><Link to="/vi/restaurants" onClick={handleClick}  >ẨM THỰC</Link></li>
              </ul>
            </div>)}
          </div>
        </nav> 
      </header>

    )
}

 
export default Navbar

