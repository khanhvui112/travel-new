import {useContext}  from 'react';
import PaginationTable from '../../common/PaginationTable';
import RowPlace from './RowPlace';
import { PlaceContext } from '../../../contexts/PlaceContext';
import AddPlace from './AddPlace';

function PlaceAdmin() {
  const {handlePage,placeByPage} = useContext(PlaceContext);
  if(placeByPage !== undefined) {
    return (
      <div>
      <AddPlace/>
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
                  <th scope="col">Loại hình du lịch</th>
                  <th scope="col">Đăng ngày</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="show_table"  >
                  {
                    Array.from(placeByPage.pageRespDtos).map((place,index) => {
                        return (                               
                          <RowPlace key={index} place={place} />                              
                            )
                        })     
                  }                           
              </tbody>
            </table>
          <nav aria-label="Page navigation example">
               <PaginationTable  onClick={handlePage} totalPage={placeByPage.totalPage}/>
          </nav>
          </div>
        </div>
      </div>
  </div>  
      
    )
    }else return "";
 
}

export default PlaceAdmin


  
 
