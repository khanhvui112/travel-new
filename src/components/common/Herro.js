import React from 'react'

function Herro({children,hero}) {
    return (
        <header className={hero}>
            {children}
        </header>
        
    )   
}
Herro.defaultProps ={
    hero:"defaultHero"
}

export default Herro
