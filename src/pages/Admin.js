import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import path from "../constants/constant.js";

function Admin() {
    return (
        <>
             
             <header className="main-nav__header-one admin">
        <nav className="header-navigation stricky original">
          <div className="container">
            <div className="main-nav__logo-box">
              <Link to="/vi" className="main-nav__logo">
                <img src={path.LOGO} className="main-logo" width="123px" alt="Cổng thông tin du lịch Phú Thọ" /></Link>
              <Link to="/" className="side-menu__toggler"><i className="fa fa-bars" /></Link>
            </div>
            <div className="main-nav__main-navigation">
              <ul className="main-nav__navigation-box">
                <li><Link to="/admin/places"  >ĐIỂM DU LỊCH</Link></li>
                <li><Link to="/admin/introduces">giới thiệu</Link></li>
                <li><Link to="/admin/tours"  >TOUR DU LỊCH</Link></li>
                <li><Link to="/admin/blogs" >TIN TỨC</Link></li>
                <li><Link to="/admin/hotels"  >LƯU TRÚ</Link></li>
                <li><Link to="/admin/agencies"  >LỮ HÀNH</Link></li>
                <li><Link to="/admin/restaurants"  >ẨM THỰC</Link></li>
                <li><Link to="/admin/order-restaurant"  >Order quán ăn</Link></li>
                <li><Link to="/admin/order-tour"  >Order tour du lịch</Link></li>
                <li><Link to="/admin/order-hotel"  >Order nhà nghỉ</Link></li>
                <li><Link to="/admin/user"  >Người dùng</Link></li>
                <li><span id="user-admin">{localStorage.getItem('user')}</span></li>
              </ul>
            </div>
          </div>
        </nav> 
      </header>

            <Outlet/>
             
             
        </>
        
    )
}

export default Admin
