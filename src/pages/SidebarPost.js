import React from 'react'
import { Link} from 'react-router-dom'

function SidebarPost({blogs,url,urlDetail}) {

         
    return (
        <div className="sidebar__single sidebar__post">
        <h3 className="sidebar__title">Liên quan</h3>
            <ul className="sidebar__post-list list-unstyled">
                {
                    blogs&& blogs.map((blog,index) =>{
                        const newUrl = blog.image?blog.image:blog.imagePlaces[0].url           
                    return (<li key={index}>
                        <div className="sidebar__post-image">
                            <div style={{width: '61px', height: '63px', backgroundImage: `url("${url+newUrl}")`}} className="bg-img" />
                        </div>
                        <div className="sidebar__post-content">
                            <h3><Link to={`${urlDetail}/${blog.id}`}>{blog.title?blog.title:blog.name}</Link></h3>
                        </div>
                    </li>)}
)
                }
            </ul>
        </div>
    )
}

export default SidebarPost
