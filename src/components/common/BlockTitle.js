import React from 'react'

function BlockTitle({subtitle,title}) {
    return (
        <div className="block-title text-center">
            <p>{subtitle}</p>
            <h3>{title}</h3>
        </div>
    )
}

export default BlockTitle
