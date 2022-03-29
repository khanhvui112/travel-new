import React from 'react'

function SiteFooterCenter() {
    return (
        <div className="col-md-3 footer-list" >
        <h3 className="footer-widget__title">Liên kết</h3>
        <ul className="footer-icon-links-list list-unstyled">
          <li><a href="/vi/places"><i className="fas fa-camera-retro" /> Điểm du lịch</a></li>
          <li><a href="/vi/vtours"><i className="fas fa-cube" /> Khám phá 3D</a></li>
          <li><a href="/vi/agencies"><i className="fas fa-store-alt" /> Lữ hành</a></li>
          <li><a href="/vi/tours"><i className="fas fa-route" /> Tour du lịch</a></li>
          <li><a href="/vi/hotels"><i className="fas fa-hotel" /> Lưu trú</a></li>
          <li><a href="/vi/restaurants"><i className="fas fa-utensils" /> Ẩm thực</a></li>
        </ul>
      </div>
    )
}

export default SiteFooterCenter
