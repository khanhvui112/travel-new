import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React, { useContext, useEffect, useState } from 'react'
import { PlaceContext } from '../../../contexts/PlaceContext';
import placesService from '../../../services/placesService';

function FormPlace() {
    const {idUpdate} = useContext(PlaceContext);
    const [placeUpdate,setPlaceUpdate] = useState();
    const [place,setPlace] = useState();
     
     
    const handleCkEditor = (event, editor) => {
        setPlaceUpdate({...placeUpdate,'detail':editor.getData()})
     }
    
     const getBlogById = async (id)=>{
        try {
            const response= await placesService.get(id);
            if(response.data.success) {
                setPlaceUpdate(response.data.data);
                setPlace(response.data.data);
                }           
        } catch(err) {
            console.log(err);     
        }     
    }
     useEffect(() => {
        getBlogById(idUpdate);
     }, [idUpdate])
    
     const handleUpdate = () =>{
        const data = {...place,...placeUpdate};

        var FormData = require('form-data');
        const placeData = new FormData();
        placeData.append('name', data.name);
        placeData.append('address', data.address);
        placeData.append('price', data.price);
         // Iterate over all selected files
        Array.from( data.file).forEach(file => {
            placeData.append('files', file);
        });
        placeData.append('detail',data.detail);
        placeData.append('numberView',data.numberView);
        placeData.append('numberComment',data.numberComment);
        placeData.append('numberLike',data.numberLike);
        
    
        const update = async (id,data)=>{
            await placesService.update(id, data);    
    }
        try{
            update(localStorage.getItem('id_place'), placeData); 
            alert("Cập nhật thành công")
            document.location.reload(true);   
        }catch(error) {
            console.log("Fail call api "+error);
            }
    }
     
    
     const setParams = (event) => {
        if(event.target.name!=="file"){
            setPlaceUpdate({...placeUpdate,[event.target.name]:event.target.value});
        }else{
            setPlaceUpdate({...placeUpdate,[event.target.name]:event.target.files});
        }  
    }
     
     
    return (
        <form>
        <div className="form-group">
        <h2> cập nhật địa điểm du lịch {idUpdate}</h2>
            <label htmlFor="exampleInputEmail1">Tên địa điểm</label>
            <input type="input" name="name" className="title form-control" onChange={setParams}   value={placeUpdate?.name}    />
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Địa điểm</label>
            <input type="input" name="address" className="title form-control" onChange={setParams} value={placeUpdate?.address}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Giá</label>
            <input type="input" name="price" className="title form-control" onChange={setParams}   value={placeUpdate?.price}    />       
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Chọn ảnh</label>
            <input type="file" name="file" className="form-control-file" multiple="multiple" onChange={setParams}   />
        </div>
        <div className="form-group">    
            <label htmlFor="exampleFormControlFile1">Mô tả</label>
            <CKEditor 
                editor={ClassicEditor}
                name = "detail"
                onReady={ editor =>{
                }
              }
              onChange={handleCkEditor}
              
              data={placeUpdate?.detail}
                />
        </div>           
        <button type="button" className="btn btn-primary btn-submit" onClick={handleUpdate}>Submit</button>
      </form>
        
    )
    }
    

 

export default FormPlace
