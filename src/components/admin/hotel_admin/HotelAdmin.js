import React, { useEffect, useState } from 'react'
import PaginationTable from '../../common/PaginationTable'
import RowHotel from './RowHotel'
import hotelService from '../../../services/hotelService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AddHotel from './AddHotel'

function HotelAdmin() {
  const [page, setPage] = useState(1);
  const [hotels, setHotels] = useState();
  const [hotelUpdate,setHotelUpdate] = useState();
  const [idDelete, setIdDelete] = useState(0);
  
  const [hotel,setHotel] = useState();


  const handleDelete = (id) => {
    const deleteHotel = async (id)=>{
      await hotelService.remove(id);   
      setIdDelete(id);
   }
   try{
    const answer = window.confirm("bạn thật sự muốn xóa");
    if (answer) {
      deleteHotel(id);  
  }     
      
  }catch(error) {
    console.log("Fail call api "+error);
    }
  }

  const getIdUpdate = (hotel) => {
    setHotelUpdate(hotel);
    setHotel(hotel);
  }
  const handleUpdate = ()=>{
    const data = {...hotel,...hotelUpdate}
    
     
   var FormData = require('form-data');
   const blogData = new FormData();
   blogData.append('name', data.name);
   blogData.append('address', data.address);
   blogData.append('price', data.price);
    // Iterate over all selected files
    blogData.append('file',data.file);
   blogData.append('detail',data.detail);
   blogData.append('numberView',data.numberView?data.numberView:0);
   blogData.append('numberLike',data.numberLike?data.numberLike:0);
   blogData.append('email',data.email);
   blogData.append('price',data.price);
   blogData.append('phone',data.phone);
   blogData.append('rate',data.rate); 
   blogData.append('urlWeb',data.urlWeb); 
   console.log(data.id);
   

   const update = async (id,data)=>{
   await hotelService.update(id, data);    
   document.location.reload(true); 
  }
  const create = async (data)=>{
    await hotelService.create(data);    
    document.location.reload(true); 
   }
   try{
     if(data.id){
      update(data.id, blogData); 
      alert("cập nhật thành công")
     }else{
      create(blogData);
     }
       
       
        
   }catch(error) {
       console.log("Fail call api "+error);
       }
  }
 
  
 
  

   //phân trang
   const increment = (page) => {
    setPage(page)
  }
    const fethApi = async (page)=>{
      const response= await hotelService.getByPage(page);    
      setHotels(response.data.data);
  }
    useEffect( ()=>{
        try{
            fethApi(page);
        }
        catch(err){
            console.log("Fail call api "+err);
      } 
    },[page,hotelUpdate,idDelete])




    const setParams = (event) => {
      if(event.target.name!=="file"){
          setHotelUpdate({...hotelUpdate,[event.target.name]:event.target.value});
      }else{
          setHotelUpdate({...hotelUpdate,[event.target.name]:event.target.files[0]});
      }  
  }
  const handleCkEditor = (event, editor) => {
    setHotelUpdate({...hotelUpdate,'detail':editor.getData()})
 }
 


    return (
        <div>
      <div className="container ">
        <AddHotel/>
      </div>
    <div className="container ">
      <h2 className="title-add">Danh sách địa điểm du lịch</h2>
      <div className="row form">
        <div className="col-12">
           
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Tên</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Chi tiết</th>
                <th scope="col">Email</th>
                <th scope="col">Địa chỉ website</th>
                <th scope="col">Loại khách sạn</th>
                <th scope="col">Số điện thoại liên hệ</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody id="show_table"  >
            {
              hotels&&Array.from(hotels.pageRespDtos).map((hotel,index) => {
                        return (                               
                          <RowHotel  key={index}  handleDelete={handleDelete} getIdUpdate={getIdUpdate} hotel={hotel} />                              
                            )
                        })  
            }      
                                       
            </tbody>
          </table>
        <nav aria-label="Page navigation example">
             <PaginationTable onClick={increment}   totalPage={hotels?.totalPage}/>
        </nav>
        </div>
      </div>
    </div>
    <div className="modal fade bd-example-modal-lg kkkk model-hotel" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title " id="exampleModalLabel">Modal title</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        <form>
        <div className="form-group">
        <h2>{hotel?`cập nhật khách sạn `+ hotel?.id:'Thêm mới khách sạn'} </h2>
            <label htmlFor="exampleInputEmail1">Tên địa điểm</label>
            <input type="input" name="name" className="title form-control" onChange={setParams}   value={hotelUpdate?.name}    />
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Địa điểm</label>
            <input type="input" name="address" className="title form-control" onChange={setParams} value={hotelUpdate?.address}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Điện thoại liên hệ</label>
            <input type="input" name="phone" className="title form-control" onChange={setParams} value={hotelUpdate?.phone}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Email</label>
            <input type="input" name="email" className="title form-control" onChange={setParams} value={hotelUpdate?.email}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">website</label>
            <input type="input" name="urlWeb" className="title form-control" onChange={setParams} value={hotelUpdate?.urlWeb}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Xếp loại <i class="fal fa-star"></i></label>
            <input type="input" name="rate" className="title form-control" onChange={setParams}   value={hotelUpdate?.rate}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Giá</label>
            <input type="input" name="price" className="title form-control" onChange={setParams}   value={hotelUpdate?.price}    />       
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
              
              data={hotelUpdate?.detail}
                />
        </div>           
        <button type="button" className="btn btn-primary btn-submit" onClick={handleUpdate}>Submit</button>
      </form>
        </div>
         
      </div>
    </div>
  </div>        
     
     
</div>  
    )
}

export default HotelAdmin
