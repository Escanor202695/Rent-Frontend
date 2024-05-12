import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Printer, Twitter } from "react-feather";
import { Container } from "reactstrap";
import ReviewStarr from "../../elements/ReviewStarr";
import ContactInfo from "../../../layout/sidebarLayout/ContactInfo";
import axios from "axios";

const TopTitle = ({ singleData }) => {
  const [like, setLike] = useState(false);
  const [address, setAddress] = useState({
    subarea: "",
    area: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (singleData.areaId && singleData.subareaId) {
        const area = await axios.get(
          `https://backend.asholproperty.com/areas/${singleData.areaId}`
        );
        const subarea = await axios.get(
          `https://backend.asholproperty.com/sub-areas/${singleData.subareaId}`
          );
          
          setAddress({
            subarea: subarea.data.subAreaName,
            area: area.data.AreaName,
          });
        }
      }

    fetchData(); // Call the async function to fetch the data
  }, [singleData]);

  return (
    <div className="single-property-section">
      <Container>
        <div className="single-title">
          <div className="left-single">
            <div className="d-flex">
              <h2 className="mb-0">{singleData?.title}</h2>
            </div>
            <p className="mt-1">
              {address.subarea +
                " , " +
                address.area +
                " , " +
                "Dhaka"}
            </p>
            <ul style={{ padding: "0" }}>
              <li>
                <div>
                  <img
                    src="/assets/images/svg/icon/double-bed.svg"
                    className="img-fluid"
                    alt=""
                  />
                  <span>{singleData?.beds || 4} Bedroom</span>
                </div>
              </li>
              <li>
                <div>
                  <img
                    src="/assets/images/svg/icon/bathroom.svg"
                    className="img-fluid"
                    alt=""
                  />
                  <span>{singleData?.baths || 4} Bathroom</span>
                </div>
              </li>
              <li>
                <div>
                  <img
                    src="/assets/images/svg/icon/balcony.png"
                    className="img-fluid"
                    alt=""
                  />
                  <span>{singleData?.balcony || 4} Balcony</span>
                </div>
              </li>
              <li>
                <div>
                  <img
                    src="/assets/images/svg/icon/square-ruler-tool.svg"
                    className="img-fluid ruler-tool"
                    alt=""
                  />
                  <span>{singleData?.area_size || 2000} Sq ft</span>
                </div>
              </li>
            </ul>
            <p style={{ fontSize: "15px" }}>ID: {singleData?.id}</p>
            {/* commented out code
            
            <div className="share-buttons">
              <div className="d-inline-block">
                <a className="btn btn-gradient btn-pill">
                  <i className="fas fa-share-square"></i>
                  share
                </a>
                <div className="share-hover">
                  <ul>
                    <li>
                      <a
                        href="https://www.facebook.com/"
                        className="icon-facebook"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Facebook></Facebook>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/"
                        className="icon-twitter"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Twitter></Twitter>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        className="icon-instagram"
                        rel="noreferrer"
                      >
                        <Instagram></Instagram>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <a
                className="btn btn-dashed btn-pill ms-md-2 ms-1 save-btn"
                onClick={() => setLike(!like)}
              >
                <i className={`${like ? "fas" : "far"} fa-heart`}></i>
                Save
              </a>
              <a
                className="btn btn-dashed btn-pill ms-md-2 ms-1"
                onClick={() => window.print()}
              >
                <Printer />
                Print
              </a>
            </div>
            
          */}
          </div>
          <div className="right-single mobile-price">
            {/*<ReviewStarr rating={4} />*/}
            <h2 className="price" style={{ textTransform: "lowercase" }}>
              ৳ {singleData?.price} <span>/month</span>
            </h2>
            <ContactInfo value={singleData} mobile="true" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopTitle;
