import React from "react";
import { Col, Row } from "reactstrap";

const DetailsDeskBox = ({ data }) => {
  return (
    <div className="desc-box" id="details">
      <div className="page-section">
        <h4 className="content-title">
          Property Details
          {/*<a
            href="https://www.google.com/maps/place/New+York,+NY,+USA/@40.697488,-73.979681,8z/data=!4m5!3m4!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!8m2!3d40.7127753!4d-74.0059728?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-map-marker-alt"></i> view on map
  </a>*/}
        </h4>
        <Row>
          <Col md="6" xl="7">
            <ul className="property-list-details">
              <li>
                <span>Property Type :</span> {data?.property_type}
              </li>
              <li>
                <span>Purpose :</span> {data?.purpose}
              </li>
              <li>
                <span>Bedrooms :</span> {data?.baths}
              </li>
              <li>
                <span>Bathrooms :</span> {data?.beds}
              </li>
              <li>
                <span>Balcony :</span> {data?.balcony}
              </li>
            </ul>
          </Col>

          <Col md="6" xl="5">
            <ul className="property-list-details">
              <li>
                <span>Garage :</span>
                {data?.garage}
              </li>
              <li>
                <span>furnished :</span>
                {data?.furnished}
              </li>
              <li>
                <span>Price :</span>৳ {data?.price} / month
              </li>
              <li>
                <span>Property Size :</span> {data?.area_size} sq / ft
              </li>
              <li>
                <span>Condition :</span> {data?.condition}
              </li>
      
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailsDeskBox;
