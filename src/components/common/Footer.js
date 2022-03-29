import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import SiteFooterBottom from './SiteFooterBottom'

    
function Fotter() {
    const[show,Setshow] = useState(true);
    let url = useLocation().pathname;
      useEffect(() => {     
        Setshow(url==="/vi/admin")   
      }, [url]);
    return (
        !show?
        <>
        <section className="cta-one cta-one__home-two">
            <div className="container">
            <h3>Bạn cần một hướng dẫn viên đồng hành?</h3>
            <div className="cta-one__button-block"><a href="/vi/agencies" className="thm-btn cta-one__btn">Liên hệ</a></div>
            </div>
      </section>
      <SiteFooter />
      <SiteFooterBottom/>
        </>:""
    )
}

export default Fotter
