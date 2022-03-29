import React from 'react'

function ImageRow(url) {
    return (
        <div>
            <image className="image-columm" src= {url} alt={url}/>
        </div>
        
    )
}

export default ImageRow
