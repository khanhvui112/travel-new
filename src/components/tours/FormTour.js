import React  from 'react';

function FormTour() {
      
     
    return (
        <>
            <div className="tour-sidebar">
                <div className="tour-sidebar__search tour-sidebar__single">
                    <h3>Tìm địa điểm</h3>
                    <div className="tour-sidebar__search-form search-form" id="place-search-form">
                        <div className="input-group">
                            <input type="text" placeholder="Điểm đến" name="place" id="place" />
                        </div>
                        <div className="input-group">
                        
                        </div>
                        <div className="input-group">
                            <button type="button" className="thm-btn search-btn">Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormTour
