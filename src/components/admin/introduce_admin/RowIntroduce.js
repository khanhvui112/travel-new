import React from 'react'
import utils from '../../../common/utils'
import constant from '../../../constants/constant'

function RowIntroduce({introduce,handleDelete,getIdUpdate}) {
    return (
        
        <tr>
        <td>{introduce.id}</td>
        <td>{introduce.title}</td>
        <td><a href={constant.IMAGE_POST+introduce.image} className="center-blog"><img className="image-columm" src= {constant.IMAGE_POST+introduce.image} alt={introduce.title}/></a></td>     
        <td id="blog-detail" className="row-clamp">{introduce.detail}</td>                 
        <td>{utils.convertDateTime(introduce.createDate)}</td>  
        <td>         
            <button type="button" className="btn btn-primary"  data-toggle="modal" data-target=".bd-example-modal-lg" onClick={()=>getIdUpdate(introduce)}>Update</button>
            <button type="button" className="btn btn-danger" onClick={()=>handleDelete(introduce.id)}>Delete</button>
        </td>
    </tr>
        
    )
}

export default RowIntroduce
