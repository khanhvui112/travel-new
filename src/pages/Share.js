import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton,
     TelegramShareButton,PinterestShareButton, LinkedinShareButton, } from "react-share";
 

function Share({url}) {
  
    return (
        <>
            <div className="blog-details__bottom">
                <div className="sidebar__social-list">
                    <span className="px-2">Chia sẻ</span>

                    <FacebookShareButton className="Demo__some-network__share-button" url={url} title={url}>
                    <Link to="#" target="_blank">
                        <i className="fab fa-facebook-f"></i>
                    </Link>                        
                    </FacebookShareButton>
                    <TwitterShareButton url={url} title={url} className="Demo__some-network__share-button">
                        <Link to="#" target="_blank">
                            <i className="fab fa-twitter"></i>
                        </Link>
                    </TwitterShareButton>
                    <TelegramShareButton url={url} title={url} >
                        <Link to="#" target="_blank">
                            <i className="fab fa-telegram-plane"></i>
                        </Link>                       
                    </TelegramShareButton>
                    <PinterestShareButton url={url} title={url} >
                        <Link to="#" target="_blank">
                            <i className="fab fa-pinterest-p"></i>
                        </Link>
                    </PinterestShareButton>
                    <LinkedinShareButton url={url} title={url}>
                        <Link to="#" target="_blank">
                            <i className="fab fa-linkedin-in"></i>
                        </Link>
                    </LinkedinShareButton>


                    
                </div>
            </div>
        </> 
        
    )
}

export default Share
