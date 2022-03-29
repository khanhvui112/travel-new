import React, { useEffect, useState } from 'react'
import PaginationTable from '../../common/PaginationTable'
import AddUser from './AddUser'
import userService from '../../../services/userService';
import RowUser from './RowUser';

function UserAdmin() {
    const [users, setUsers] = useState();
    const [page, setPage] = useState(1);
    const [userUpdate, setUserUpdate] = useState();
    const [user, setUser] = useState();
    const [idDelete, setIdDelete] = useState();
  
    //phân trang
   const increment = (page) => {
    setPage(page)
  }
  const handleUpdate = ()=>{
    const data = {...user,...userUpdate}
    
     
   const FormData = require('form-data');
   const tourData = new FormData();
   tourData.append('name', data.name);
   tourData.append('email', data.email);
   tourData.append('password', data.password);
    
   
  
   const update = async (id,data)=>{
    await userService.update(id, data);    
    alert("Sửa thành công")
    window.location.reload()
  }
  const create = async (data)=>{
    await userService.create(data);    
    alert("Thêm mới thành công")
    window.location.reload()
   }
   try{
     if(data.id){
      update(data.id, tourData); 
      
     }else{
      create(tourData);
      
     }
     
      
       
        
   }catch(error) {
       console.log("Fail call api "+error);
       }
  }
  const handleDelete = (id) => {
    const deleteHotel = async (id)=>{
      await userService.remove(id);   
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
  const getIdUpdate = (user) => {
    setUserUpdate(user);
    setUser(user);
  }
    const getBypage = async (page)=>{
      const response= await userService.getByPage(page) 
      setUsers(response.data.data) 
       
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
        setUserUpdate({...userUpdate,[event.target.name]:event.target.value});
      }else{
        setUserUpdate({...userUpdate,[event.target.name]:event.target.files});
      }  
  }
 
    return (
        <>
            <AddUser/>
            <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h2>Danh sách tour du lịch</h2>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Tên người dùng</th>
                          <th scope="col">Email</th>
                          <th scope="col">Mật khẩu</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody id="show_table"  >
                        {
                        users&&  Array.from(users.pageRespDtos).map((user,index) => {              
                            return (<RowUser key={index} getIdUpdate={getIdUpdate} handleDelete={handleDelete}  hotel={user}/>)})   
                        }                              
                      </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                      <PaginationTable onClick={increment} totalPage={users?.totalPage}/>
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
        <h2>Cập nhật thông tin người dùng </h2>
            <label htmlFor="exampleInputEmail1">Tên </label>
            <input type="input" name="name" className="title form-control" onChange={setParams}   value={userUpdate?.name}    />
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

export default UserAdmin
