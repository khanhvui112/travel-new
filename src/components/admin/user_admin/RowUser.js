import React  from 'react'

function RowUser({hotel,getIdUpdate,handleDelete}) {
 
    return (
        <>
        <tr>
        <td>{hotel.id}</td>
        <td>{hotel.name}</td>
        <td>{hotel.email}</td>         
        <td>{hotel.password}</td>    
        <td className="action">           
            <button type="button" className="btn btn-primary"  data-toggle="modal" data-target=".bd-example-modal-lg" onClick={()=>getIdUpdate(hotel)}>Update</button>
            <button type="button" className="btn btn-danger" onClick={()=>handleDelete(hotel.id)}>Delete</button>
        </td>
    </tr>
        </>
        
    )
}

export default RowUser
