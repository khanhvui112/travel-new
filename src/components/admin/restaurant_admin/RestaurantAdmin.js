import React, { useEffect, useState } from 'react'
import PaginationTable from '../../common/PaginationTable'
import RowRestaurant from './RowRestaurant'
import restaurantService from '../../../services/RestaurantService'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AddRestaurant from './AddRestaurant'

function RestaurantAdmin() {
  const [restaurants, setRestaurants] = useState();
  const [idDelete, setIdDelete] = useState();
  const [restaurant, setRestaurant] = useState();
  const [restaurantUpdate, setRestaurantUpdate] = useState();
   
  const [page, setPage] = useState(1);
   
 

  const getIdUpdate = (restaurant) => {
    setRestaurantUpdate(restaurant)
    setRestaurant(restaurant);
  }
  const handleDelete = (id) => {
    const deleteHotel = async (id)=>{
      await restaurantService.remove(id);  
      setIdDelete(id);
   }
    try {
      const answer = window.confirm("bạn thật sự muốn xóa");
      if (answer) {
        deleteHotel(id);  
    }     
        
    } catch(error) {
      console.log("Fail call api "+error);
    }
  }
  //phân trang
  const increment = (page) => {
    setPage(page)
  }
    const fethApi = async (page)=>{
      const response= await restaurantService.getByPage(page);    
      setRestaurants(response.data.data);
  }
    useEffect( ()=>{
        try{
            fethApi(page);
        }
        catch(err){
            console.log("Fail call api "+err);
      } 
    },[page,idDelete])

    const setParams = (event) => {
      if(event.target.name!=="file"){
          setRestaurantUpdate({...restaurantUpdate,[event.target.name]:event.target.value});       
      }else{
        setRestaurantUpdate({...restaurantUpdate,[event.target.name]:event.target.files});
        
      }  
  }
  const handleCkEditor = (event, editor) => {
    setRestaurantUpdate({...restaurantUpdate,'detail':editor.getData()})
     
 }
 const handleUpdate = ()=>{
  const data = {...restaurant,...restaurantUpdate}
  console.log(data.file);
  
   
 var FormData = require('form-data');
 const blogData = new FormData();
 blogData.append('name', data.name);
 blogData.append('address', data.address);
 blogData.append('price', data.price);
  // Iterate over all selected files
 Array.from( data.file).forEach(file => {
  blogData.append('files', file);
 });
 blogData.append('detail',data.detail);
 blogData.append('numberView',data.numberView?data.numberView:0);
 blogData.append('numberLike',data.numberLike?data.numberLike:0);
 blogData.append('email',data.email);
 blogData.append('phone',data.phone);
 

 const update = async (id,data)=>{
    await restaurantService.update(id, data);    

}
const create = async (data)=>{
    await restaurantService.create(data);    
 }
 try{
   if(data.id){
    update(data.id, blogData); 
    alert("cập nhật thành công")
   }else{
    create(blogData);
    alert("thêm mới thành công")
   }
   document.location.reload(true);   
   
     
      
 }catch(error) {
     console.log("Fail call api "+error);
     }
}
  

    return (
         <>
         <div className="container">
         <div className="modal-body">
          <AddRestaurant/>
        </div>
         </div>
        <div className="container ">
          <h2 className="title-add">Danh sách quán ăn</h2>
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
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Đăng ngày</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="show_table"  >
                {
                    restaurants?  Array.from(restaurants.pageRespDtos).map((restaurant,index) => {
                        return (                               
                          <RowRestaurant handleDelete={handleDelete} getIdUpdate={getIdUpdate} key={index} restaurant={restaurant} />                              
                            )
                        }) :""   
                }                               
                </tbody>
              </table>
            <nav aria-label="Page navigation example">
                 <PaginationTable onClick={increment}   totalPage={restaurants?.totalPage}/>
            </nav>
            </div>
          </div>
        </div>
        <div className="modal fade bd-example-modal-lg kkkk" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <h2 className="mb-5">Sửa quán ăn {restaurant?.id}</h2>
            <label htmlFor="exampleInputEmail1">Tên địa điểm</label>
            <input type="input" name="name" className="title form-control" onChange={setParams}   value={restaurantUpdate?.name}    />
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Địa điểm</label>
            <input type="input" name="address" className="title form-control" onChange={setParams} value={restaurantUpdate?.address}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Điện thoại liên hệ</label>
            <input type="input" name="phone" className="title form-control" onChange={setParams} value={restaurantUpdate?.phone}    />       
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
              
              data={restaurantUpdate?.detail}
                />
        </div>           
        <button type="button" className="btn btn-primary btn-submit" onClick={handleUpdate}>Submit</button>
      </form>
        </div>
         
      </div>
    </div>
  </div>   
        </>
    )
}

export default RestaurantAdmin
