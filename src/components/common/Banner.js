import React from 'react'

function Banner({title,page}) {
    return (
        <section className="page-header jquery-ripples">
            <div className="container">
                <h2>{title}</h2>
                    <ul className="thm-breadcrumb list-unstyled">
                        <li><a href="/vi">Trang chủ</a>
                        </li><li><span>{page}</span></li>
                    </ul>
            </div>
            <canvas width={1526} height={306} style={{position: 'absolute', inset: '0px', zIndex: -1}} />
        </section>
    )
}
Banner.defaultProps = {
    title:" "
}

export default Banner;

