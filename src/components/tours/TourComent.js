import React from 'react'
import FormComent from '../common/FormComent'

function TourComent() {
    return (
        <div className="tour-details__review-form">
        <div class="tour-details__review-form-stars">
            <div class="row">
            <div className="col-md-4">
                <p><span>Dịch vụ</span> </p>
                <select class="form-select" aria-label="Default select example">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                </select>
            </div>
            <div className="col-md-4">
                <p><span>Thoải Mái</span> </p>
                <select class="form-select" aria-label="Default select example">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                </select>
            </div>
            <div className="col-md-4">
                <p><span>Lòng hiếu khách</span> </p>
                <select class="form-select" aria-label="Default select example">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                </select>
            </div>
            <div className="col-md-4">
                <p><span>Món ăn</span> </p>
                <select class="form-select" aria-label="Default select example">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                </select>
            </div>
            <div className="col-md-4">
                <p><span>Vị trí</span> </p>
                <select class="form-select" aria-label="Default select example">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                </select>
            </div>
            <div className="col-md-4">
                <p><span>Xếp hạng</span> </p>
                <select class="form-select" aria-label="Default select example">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                </select>
            </div>
            </div>
        <FormComent/>
    </div>

</div>
    )
}

export default TourComent
