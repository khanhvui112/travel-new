import React, { useEffect, useState } from 'react'
import PaginationTable from '../../common/PaginationTable'
import RowTour from './RowTour'
import tourService from '../../../services/TourService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AddNew from '../place_admin/AddNew'

function TourAdmin() {
  const [tours, setTours] = useState();
  const [page, setPage] = useState(1);
  const [tourUpdate, setTourUpdate] = useState();
  const [tour, setTour] = useState();
  const [idDelete, setIdDelete] = useState();

  //phân trang
 const increment = (page) => {
  setPage(page)
}
const handleUpdate = ()=>{
  const data = {...tour,...tourUpdate}
  console.log(data);
  
   
 const FormData = require('form-data');
 const tourData = new FormData();
 tourData.append('title', data.title);
 tourData.append('price', data.price);
 tourData.append('totalDay', data.totalDay);
 tourData.append('detail',data.detail);
 tourData.append('totalPerson',data.totalPerson);
 tourData.append('departure',data.departure);
 Array.from( data.file).forEach(file => {
  tourData.append('files', file);
});
 

 const update = async (id,data)=>{
  await tourService.update(id, data);    
}
const create = async (data)=>{
  await tourService.create(data);    
 }
 try{
   if(data.id){
    update(data.id, tourData); 
   }else{
    create(tourData);
   }
   alert("Sửa thành công")
   document.location.reload(true);   
     
      
 }catch(error) {
     console.log("Fail call api "+error);
     }
}
const handleDelete = (id) => {
  const deleteHotel = async (id)=>{
    await tourService.remove(id);   
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
const getIdUpdate = (tour) => {
  setTourUpdate(tour);
  setTour(tour);
}
  const getBypage = async (page)=>{
    const response= await tourService.getByPage(page) 
    setTours(response.data.data) 
     
}
  useEffect( ()=>{
      try{
          getBypage(page);
      }
      catch(err){
          console.log("Fail call api "+err);
    } 
  },[page,idDelete])
  const setParams = (event) => {
    if(event.target.name!=="file"){
      setTourUpdate({...tourUpdate,[event.target.name]:event.target.value});
    }else{
      setTourUpdate({...tourUpdate,[event.target.name]:event.target.files});
    }  
}
const handleCkEditor = (event, editor) => {
  setTourUpdate({...tourUpdate,'detail':editor.getData()})
}

    return (
          <>
            <AddNew/>
            <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h2>Danh sách tour du lịch</h2>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Tên tour</th>
                          <th scope="col">Ảnh</th>
                          <th scope="col">Chi tiết</th>
                          <th scope="col">Giá</th>
                          <th scope="col">Thời gian tour</th>
                          <th scope="col">Tổng số người</th>
                          <th scope="col">Địa điểm bắt đầu</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody id="show_table"  >
                        {
                        tours&&  Array.from(tours.pageRespDtos).map((tour,index) => {              
                            return (<RowTour key={index} getIdUpdate={getIdUpdate} handleDelete={handleDelete}  tour={tour}/>)})   
                        }                              
                      </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                      <PaginationTable onClick={increment} totalPage={tours?.totalPage}/>
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
        <h2>Cập nhật Tour </h2>
            <label htmlFor="exampleInputEmail1">Tên </label>
            <input type="input" name="title" className="title form-control" onChange={setParams}   value={tourUpdate?.title}    />
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Giá</label>
            <input type="input" name="price" className="title form-control" onChange={setParams} value={tourUpdate?.price}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Tổng số ngày</label>
            <input type="input" name="totalDay" className="title form-control" onChange={setParams} value={tourUpdate?.totalDay}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Tổng số người</label>
            <input type="input" name="totalPerson" className="title form-control" onChange={setParams} value={tourUpdate?.totalPerson}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Điểm xuất phát</label>
            <input type="input" name="departure" className="title form-control" onChange={setParams} value={tourUpdate?.departure}    />       
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
              
              data={tourUpdate?.detail}
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

export default TourAdmin
