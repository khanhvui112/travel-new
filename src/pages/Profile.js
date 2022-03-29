import React from 'react';

function Profile() {

     
    const logout = ()=>{
        localStorage.removeItem("accessToken");
        alert("Logout success");
    }

    return (
        <>
            <div>username:</div>
            <button>Logout</button>
        </>
    )
}

export default Profile
