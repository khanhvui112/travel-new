import React, { useEffect, useState } from 'react'
import utils from '../../../common/utils';
import orderService from '../../../services/oderService'
import PaginationTable from '../../common/PaginationTable';

function OrderTour() {
    const [customers,setCustomers] = useState();
    const [page,Setpage] = useState(1);
    
    //phân trang
   const increment = (page) => {
    Setpage(page)
  }
    const getBypage = async (page)=>{
      const response= await orderService.getOrderTourByPage(page) 
      setCustomers(response.data.data) 
       
  }
    useEffect( ()=>{
        try{
            getBypage(page);
        }
        catch(err){
            console.log("Fail call api "+err);
      } 
    },[page])
    const handleUpdate = async (id)=>{
      await orderService.updateTourService(id) 
      window.location.reload()
    }
    const handleDelete = async (id)=>{
      const answer = window.confirm("bạn thật sự muốn xóa");
      if (answer) {
        await orderService.removeTourService(id) 
        window.location.reload()
    } 

    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <h2>Danh sách khách hàng đặt quán ăn</h2>
                    <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Tên khách hàng</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Ghi chú</th>
                  <th scope="col">Tên nhà hàng</th>
                  <th scope="col">Thời gian đặt</th>
                  <th scope="col">Trạng thái đơn </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="show_table"  >
              {
              customers&&  Array.from(customers.pageRespDtos).map((customer,index) => {
                        return (<tr key={index}>
                                    <td>{customer.id}</td>
                                    <td>{customer.nameCustomer}</td>
                                    <td>{customer.email}</td>         
                                    <td>{customer.phone}</td>   
                                    <td  id="blog-detail" className="row-clamp">{customer.note}</td>              
                                    <td>{customer.nameTour}</td>  
                                    <td>{utils.getTime(customer.dateOrder)+" "+utils.convertDateTime(customer.dateOrder) }</td>  
                                    <td>{customer.status?"Đã xác thực":"Chưa xác thực"}</td>  
                                    <td>          
                                        {!customer.status &&<button type="button"   className="btn btn-primary"  data-toggle="modal" data-target=".bd-example-modal-lg"onClick={()=>handleUpdate(customer.id)}>Confirm</button> }
                                        <button  type="button" className="btn btn-danger"onClick={()=>handleDelete(customer.id)}>Delete</button>
                                    </td>
                                </tr>)})   
                }        
                            
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
               <PaginationTable onClick={increment} totalPage={customers?.totalPage}/>
          </nav>                    
                    </div>
                </div>
            </div>
            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
                    <h2>blody</h2>
                     
            </div>
             
          </div>
        </div>
      </div>      
        </>
    )
}

export default OrderTour
