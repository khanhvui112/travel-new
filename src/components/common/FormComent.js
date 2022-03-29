import React from 'react'

function FormComent() {
    return (
        <>
            <div className="comment-one">
                <h3 className="comment-one__title">0 bình luận</h3>
            </div>
            <div className="comment-form" id="comment-form">
                <input type="hidden" id="hdCommentID" defaultValue />
                <input type="hidden" id="hdBlogID" defaultValue={1} />
                <input type="hidden" id="hdLang" defaultValue="vi" />                
                <h3 className="comment-form__title">Viết bình luận của bạn</h3>
                <form className="contact-one__form">
                    <div className="row low-gutters">
                    <div className="col-md-6">
                        <div className="input-group">
                            <input type="text" id="name" placeholder="Họ và tên" />
                        </div>
                    </div>
                     <div className="col-md-6">
                        <div className="input-group">
                            <input type="text" id="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-group">
                            <textarea id="message" placeholder="Nội dung" defaultValue={""} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-group">
                            <button type="button" className="thm-btn contact-one__btn">Gửi bình luận</button></div>
                        </div>
                    </div>
                </form>
            </div>  
        </>
        
    )
}

export default FormComent
