import React, { useEffect, useState } from 'react'
import PaginationTable from '../../common/PaginationTable'
import AddAgency from './AddAgency'
import RowAgency from './RowAgency'
import agencyService from '../../../services/agencyService'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

function AgencyAdmin() {
  const [page, setPage] = useState(1);
  const [agencies, setAgencies] = useState();
  const [agencyUpdate,setAgencyUpdate] = useState();
  const [idDelete, setIdDelete] = useState(0);
  
  const [agency,setAgency] = useState();


  const handleDelete = (id) => {
    const deleteAgency = async (id)=>{
      await agencyService.remove(id);   
      setIdDelete(id);
   }
   try{
    const answer = window.confirm("bạn thật sự muốn xóa");
    if (answer) {
      deleteAgency(id);    
  }     
  }catch(error) {
    console.log("Fail call api "+error);
    }
  }


  const getIdUpdate = (agency) => {
    setAgencyUpdate(agency);
    setAgency(agency);
  }
  const handleUpdate = ()=>{
    const data = {...agency,...agencyUpdate}
    
     
   const FormData = require('form-data');
   const blogData = new FormData();
   blogData.append('name', data.name);
   blogData.append('address', data.address);
    blogData.append('file',data.file);
   blogData.append('detail',data.detail);
   blogData.append('numberView',data.numberView?data.numberView:0);
   blogData.append('numberLike',data.numberLike?data.numberLike:0);
   blogData.append('email',data.email);
   blogData.append('phone',data.phone);
   blogData.append('urlWeb',data.urlWeb); 
   

   const update = async (id,data)=>{
      await agencyService.update(id, data);    
      document.location.reload(true);   
  }
  const create = async (data)=>{
    await agencyService.create(data);    
    document.location.reload(true);    
   }
   try{
     if(data.id){
      update(data.id, blogData); 
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
      const response= await agencyService.getByPage(page);    
      setAgencies(response.data.data);
  }
    useEffect( ()=>{
        try{
            fethApi(page);
        }
        catch(err){
            console.log("Fail call api "+err);
      } 
    },[page,agencyUpdate,idDelete])




    const setParams = (event) => {
      if(event.target.name!=="file"){
          setAgencyUpdate({...agencyUpdate,[event.target.name]:event.target.value});
      }else{
          setAgencyUpdate({...agencyUpdate,[event.target.name]:event.target.files[0]});
      }  
  }
  const handleCkEditor = (event, editor) => {
    setAgencyUpdate({...agencyUpdate,'detail':editor.getData()})
 }
 


    return (
      <>
        <AddAgency/>
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
                    <th scope="col">Đăng ngày</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="show_table"  >
                {
              agencies&&Array.from(agencies.pageRespDtos).map((agency,index) => {
                        return (                               
                          <RowAgency  key={index}  handleDelete={handleDelete} getIdUpdate={getIdUpdate} agency={agency} />                              
                            )
                        })  
            }                            
                </tbody>
              </table>
            <nav aria-label="Page navigation example">
                 <PaginationTable onClick={increment}   totalPage={agencies?.totalPage}/>
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
        <h2>{`cập nhật khách sạn `+ agency?.id} </h2>
            <label htmlFor="exampleInputEmail1">Tên lữ hành</label>
            <input type="input" name="name" className="title form-control" onChange={setParams}   value={agencyUpdate?.name}    />
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Địa điểm</label>
            <input type="input" name="address" className="title form-control" onChange={setParams} value={agencyUpdate?.address}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Điện thoại liên hệ</label>
            <input type="input" name="phone" className="title form-control" onChange={setParams} value={agencyUpdate?.phone}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Email</label>
            <input type="input" name="email" className="title form-control" onChange={setParams} value={agencyUpdate?.email}    />       
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">website</label>
            <input type="input" name="urlWeb" className="title form-control" onChange={setParams} value={agencyUpdate?.urlWeb}    />       
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
              
              data={agencyUpdate?.detail}
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

export default AgencyAdmin
