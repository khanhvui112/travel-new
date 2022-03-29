import React from 'react'

function SearchByType() {
    const toggler=()=>{
        let selector=document.querySelector('.toggled');
        if(selector){
            console.log("toggled")
            document.querySelector('.tour-sidebar__sorter-toggler').classList.remove("toggled");
            document.querySelector('.tour-sidebar__sorter-content').style.display='block';
        }else{
            console.log("toggled")
            document.querySelector('.tour-sidebar__sorter-toggler').classList.add("toggled");
            document.querySelector('.tour-sidebar__sorter-content').style.display='none';
        }
       
    }
    return (
        <div className="tour-sidebar__sorter-single">
            <div className="tour-sidebar__sorter-top">
                <h3>Loại hình</h3>
                <button className="tour-sidebar__sorter-toggler toggled" onClick={()=>toggler()}>
                    <i className="fa fa-angle-down" />
                </button>
            </div>
            <div className="tour-sidebar__sorter-content" style={{display: 'none'}}>
                <div className="tour-sidebar__sorter-inputs">
                    <p><input type="checkbox" id="type-1" name="types" defaultValue={1} />
                        <label htmlFor="type-1">Nhà hàng</label>
                    </p>
                    <p>
                        <input type="checkbox" id="type-2" name="types" defaultValue={2} />
                        <label htmlFor="type-2">Quán ăn</label>
                    </p>
                    <p>
                        <input type="checkbox" id="type-3" name="types" defaultValue={3} />
                        <label htmlFor="type-3">Cơ sở đạt chuẩn phục vụ khách du lịch</label>
                    </p>
                    <p>
                        <input type="checkbox" id="type-4" name="types" defaultValue={4} />
                        <label htmlFor="type-4">Trà, cà phê và thức uống</label>
                    </p>
                </div>
            </div>
                                    
        </div>
    )
}

export default SearchByType
