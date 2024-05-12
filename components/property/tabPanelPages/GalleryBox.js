import React from "react";
import { Col, Row } from "reactstrap";
import Exploration from "../../../layout/sidebarLayout/Exploration";
import GallerySlider from "../stickyTabOrClassic/GallerySlider";
import Img from "../../../utils/BackgroundImageRatio";

const GalleryBox = ({ exploration, images, }) => {
  return (
    <Row>
      <Col sm="12">
        <div className="single-gallery mb-4">
          <GallerySlider images={images} />
        </div>
      </Col>
    </Row>
  );
};

export default GalleryBox;
