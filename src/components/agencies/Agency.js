import React from 'react'
import { Link } from 'react-router-dom'
import constant from "../../constants/constant.js"

function Agency({agency}) {
      
    return (
        <div className="tour-two__single tour-one__single">
        <div className="tour-two__image-wrap">
            <div className="tour-one__image">
                <img src={constant.IMAGE_AGENCY+agency.image} className="img-fluid" alt=""/>
                    <span className="add-favorite" data-type="Agency" data-id="2" data-lang="vi">
                        <i className="fa fa-heart"></i>
                        <sup id="Agency_Likes_2">{agency&&agency.numberLike}</sup>
                    </span>
            </div>
        </div>
        <div className="tour-one__content">
            <div className="tour-two__top">
                <div className="tour-two__top-left">
                    <div className="tour-one__stars">
                        <i className="fas fa-eye"></i> {agency&&agency.numberView} Lượt xem<i className="far fa-heart ml-3"></i> {agency&&agency.numberLike} Lượt thích
                    </div>
                    <h3><Link to={`/vi/agencies/detail/${agency&&agency.id}`}>{agency&&agency.name}</Link></h3>
                </div>
                <div className="tour-two__right">
                </div>
            </div>
            <div className="tour-two__text">
                <p>{agency&&agency.address}</p>
                </div>
                    <ul className="tour-one__meta list-unstyled">
                        <li><a href="tel:(0210) 6 330 456/ 0967 105 005/ 0916 658 158"><i className="fas fa-phone-alt"></i>{agency&&agency.phone}</a></li>
                        <li><a href="mailto:datvietxanh.jsc@gmail.com/ datvietxanhtravel@gmail.co"><i className="fas fa-envelope"></i>{agency&&agency.email}</a></li>
                        <li><a href="www.datvietxanhtravel.com" target="_blank"><i className="fas fa-globe"></i>{agency&&agency.urlWeb}</a></li>
                    </ul>
        </div>
    </div>
        
    )
}

export default Agency
