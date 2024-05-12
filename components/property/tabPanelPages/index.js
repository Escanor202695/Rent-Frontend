/**
 * It returns the children of the component, the top title, the image section, the gallery box, the
 * single property section, the reviews desk box, the contact info, the exploration, the filter, the
 * featured, the recently added, the mortgage, and the related property
 * @param props - {
 * @returns A React component.
 */
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import TopTitle from "../stickyTabOrClassic/TopTitle";
import Sidebar from "../../../layout/sidebarLayout/Sidebar";
import ReviewsDeskBox from "../stickyTabOrClassic/ReviewsDeskBox";
import ContactInfo from "../../../layout/sidebarLayout/ContactInfo";
import Exploration from "../../../layout/sidebarLayout/Exploration";
import Mortgage from "../../../layout/sidebarLayout/Mortgage";
import Featured from "../../../layout/sidebarLayout/Featured";
import Filter from "../../../layout/sidebarLayout/Filter";
import RecentlyAdded from "../../../layout/sidebarLayout/RecentlyAdded";
import RelatedProperty from "../stickyTabOrClassic/RelatedProperty";
import GalleryBox from "./GalleryBox";
import ImageSection from "./Image";
import SinglePropertySection from "./SinglePropertySection";
import VideoSection from "../tabPanelPages/Video";
const BodyContent = (props) => {
  return (
    <div>
      {props?.singleData?.videoURL !== "" && (
        <VideoSection videoURL={props?.singleData?.videoURL} />
      )}
      <section className="without-top property-main small-section">
        <TopTitle singleData={props.singleData} />
      </section>
      <section className="single-property mt-0 pt-0">
        <Container>
          <Row className="ratio_55">
            <Col xl="9" lg="8">
              <div className="description-section tab-description">
                <GalleryBox
                  exploration={props.exploration}
                  images={props.singleData?.images}
                />
                <SinglePropertySection data={props.singleData} />
              </div>
            </Col>
            <Sidebar col="3">
              <ContactInfo value={props?.singleData} />
            </Sidebar>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BodyContent;
