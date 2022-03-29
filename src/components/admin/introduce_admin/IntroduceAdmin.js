import React, { useEffect, useState } from 'react'
import AddIntroduce from './AddIntroduce'
import PaginationTable from '../../common/PaginationTable'
import postsService from '../../../services/postsService'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import RowIntroduce from './RowIntroduce'

function IntroduceAdmin() {
    const [page, setPage] = useState(1);
    const [introduces, setIntroduces] = useState();
    const [introduceUpdate,setIntroduceUpdate] = useState();
    const [idDelete, setIdDelete] = useState(0);
    
    const [introduce,setIntroduce] = useState();
  
  
    const handleDelete = (id) => {
      const deleteIntroduce = async (id)=>{
        await postsService.remove(id);   
        setIdDelete(id);
     }
     try{
      const answer = window.confirm("bạn thật sự muốn xóa");
      if (answer) {
        deleteIntroduce(id);
    }      
    }catch(error) {
      console.log("Fail call api "+error);
      }
    }
  
  
    const getIdUpdate = (introduce) => {
      setIntroduceUpdate(introduce);
      setIntroduce(introduce);
    }
    const handleUpdate = ()=>{
      const data = {...introduce,...introduceUpdate}
 
     var FormData = require('form-data');
     const blogData = new FormData();
     blogData.append('title', data.title);
      // Iterate over all selected files
      blogData.append('file',data.file);
     blogData.append('detail',data.detail);
     blogData.append('numberView',data.numberView?data.numberView:0);
     blogData.append('numberLike',data.numberLike?data.numberLike:0);
     
  
     const update = async (id,data)=>{
     await postsService.update(id, data);    
     alert('sửa thành công') 
     document.location.reload(true);   
    }
    const create = async (data)=>{
      await postsService.create(data);    
      alert('thêm mới thành công') 
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
        const response= await postsService.getByPage(page);    
        setIntroduces(response.data.data);
    }
      useEffect( ()=>{
          try{
              fethApi(page);
          }
          catch(err){
              console.log("Fail call api "+err);
        } 
      },[page,introduceUpdate,idDelete])
  
  
  
  
      const setParams = (event) => {
        console.log("event go");
        if(event.target.name!=="file"){
            setIntroduceUpdate({...introduceUpdate,[event.target.name]:event.target.value});
        }else{
            setIntroduceUpdate({...introduceUpdate,[event.target.name]:event.target.files[0]});
        }  
    }
    const handleCkEditor = (event, editor) => {
        setIntroduceUpdate({...introduceUpdate,'detail':editor.getData()})
   }
   
    return (
        <>
        <AddIntroduce/>
        <div className="container ">
          <h2 className="title-add">Danh sách bài viết giới thiệu</h2>
          <div className="row form">
            <div className="col-12">
               
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">tiêu đề</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Chi tiết</th>
                    <th scope="col">Đăng ngày</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody id="show_table"  >
                {
              introduces&&Array.from(introduces.pageRespDtos).map((introduce,index) => {
                        return (                               
                          <RowIntroduce  key={index}  handleDelete={handleDelete} getIdUpdate={getIdUpdate} introduce={introduce} />                              
                            )
                        })  
            }                            
                </tbody>
              </table>
            <nav aria-label="Page navigation example">
                 <PaginationTable onClick={increment}   totalPage={introduces?.totalPage}/>
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
        <h2>{`cập nhật bài viết giới thiệu `+ introduce?.id} </h2>
            <label htmlFor="exampleInputEmail1">Tên tiêu đề</label>
            <input type="input" name="title" className="title form-control" onChange={setParams}   value={introduceUpdate?.title}    />
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
              
              data={introduceUpdate?.detail}
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

export default IntroduceAdmin
