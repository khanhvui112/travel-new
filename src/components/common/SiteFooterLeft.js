import React from 'react'

function SiteFooterLeft() {
    return (
        <div className="col-md-5"><a href="/vi" className="footer-widget__logo"><img src="/image/img-block/logo_bottom.png" width={250} alt="" /></a>
        <div className="footer-header"><b>Đại học hùng vương</b></div>
        <div className="footer-desc"><p>Đại lộ hùng vương , thành phố Việt Trì, tỉnh Phú Thọ</p></div>
        <div className="footer-email"><i className="fas fa-envelope" /><a href="ngocmeu2000@gmail.com">Email: ngocmeu2000@gmail.com</a></div>
        <div className="footer-phone"><i className="fas fa-phone-alt" /> <a href="tel:Tel: 0210.3846.390">Tel: 0210.3846.390</a><br /></div>    
      </div>
    )
}

export default SiteFooterLeft
