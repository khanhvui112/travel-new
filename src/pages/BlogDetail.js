import React from 'react';
import { Link } from 'react-router-dom';
import Share from './Share';
import {useEffect} from 'react';
import utils from '../common/utils';

function BlogDetail({blog}) {
    const {create_date,numberComment,numberView,numberLike,title,detailSummary,detail}={...blog};
    
    useEffect(() => {
        document.querySelector('.blog-details__details').innerHTML=detail;
    }, [detail])
    return (
        <div className="blog-details__content">
        <ul className="list-unstyled blog-one__meta">
            <li><Link to="#"><i className="far fa-calendar-alt" />{utils.convertDateTime(create_date)}</Link></li>
            <li><Link to="#"><i className="far fa-comments" /> {numberComment} Bình luận</Link></li>
            <li><Link to="#"><i className="fas fa-eye" /> {numberView} Lượt xem</Link></li>
            <li><Link to="#" className="add-favorite"><i className="fa fa-heart" /><span id="Blog_Likes_1">{numberLike}</span> Lượt thích</Link></li>
        </ul>
        <h3>{title}</h3>
        <p className="blog-details__summary">{detailSummary}</p>
        <div className="blog-details__details"/>
        <Share url={window.location.href}/>                          
    </div>
    )
}

export default BlogDetail;
