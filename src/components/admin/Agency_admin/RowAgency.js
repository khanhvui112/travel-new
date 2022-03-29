import React from 'react'
import utils from '../../../common/utils'
import constant from '../../../constants/constant'

function RowAgency({agency,handleDelete,getIdUpdate}) {
    return (
        <tr>
        <td>{agency.id}</td>
        <td>{agency.name}</td>
        <td>{agency.address}</td>  
        <td><a href={constant.IMAGE_AGENCY+agency.image} className="center-blog"><img className="image-columm" src= {constant.IMAGE_AGENCY+agency.image} alt={agency.name}/></a></td>     
        <td id="blog-detail" className="row-clamp">{agency.detail}</td>                 
        <td>{utils.getTime(agency.createDate)+"  "+utils.convertDateTime(agency.createDate) }</td>  
        <td>
                  
            <button type="button" className="btn btn-primary"  data-toggle="modal" data-target=".bd-example-modal-lg" onClick={()=>getIdUpdate(agency)}>Update</button>
            <button type="button" className="btn btn-danger" onClick={()=>handleDelete(agency.id)}>Delete</button>
        </td>
    </tr>
        
    )
}

export default RowAgency
