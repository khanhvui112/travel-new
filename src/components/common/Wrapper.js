import React from 'react'
import { Outlet } from 'react-router-dom'
import Fotter from './Footer'
import Header from './Header'

function Wrapper() {
    return (
        <>
            <Header/>
                <Outlet/>
            <Fotter/>
        </>
    )
}

export default Wrapper
