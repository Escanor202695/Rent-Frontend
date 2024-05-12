import React, { useState, useEffect } from "react";
import { Mail, MapPin } from "react-feather";
import { Row, Col } from "reactstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import NavbarThree from "../../../../layout/headers/NavbarThree";
const MyProfileTab = () => {
  const [profileDetail, setProfileDetail] = useState({});

  // const id =localStorage.getItem("id");
  useEffect(() => {
    // Fetch employee data using the ID from the API
    if (typeof localStorage !== "undefined") {
      const id = localStorage.getItem("id");
      axios
        .get(`https://backend.asholproperty.com/ownercustomers/${id}`)
        .then((response) => {
          setProfileDetail(response.data);
          //console.log(response.data);
        })
        .catch((error) => {
          //console.log(error);
        });
    }
  }, []);

  return (
    <>
      <NavbarThree />
      <div className="dashboard-content" style={{ paddingTop: "120px" }}>
        <div className="my-profile" id="profile">
          <div className="profile-info">
            <div className="common-card">
              <div className="user-name media">
                <div className="media-body my-2">
                  <h5>
                    {profileDetail.name}{" "}
                    <span className="label label-success px-4 mx-2">
                      Ashol Property customer
                    </span>
                  </h5>
                </div>
              </div>
              <ul className="user-detail">
                <li>
                  <MapPin />
                  <span>Downers Grove, IL</span>
                </li>
                <li>
                  <Mail />
                  <span>{profileDetail.email}</span>
                </li>
              </ul>
            </div>
            <div className="common-card">
              <Row>
                <div className="col-xxl-6 col-xl-7">
                  <div className="information-detail">
                    <div className="common-header">
                      <h5>About</h5>
                    </div>
                    <div className="information">
                      <ul>
                        <li>
                          <span>Gender :</span>
                          <p>{profileDetail.gender}</p>
                        </li>
                        <li>
                          <span>Birthday :</span>
                          <p>{profileDetail.date_of_birth}</p>
                        </li>
                        <li>
                          <span>Phone number :</span>
                          <a>{profileDetail.mobile_number}</a>
                        </li>
                        {/* <li>
                        <span>Address :</span>
                        <p>{profileDetail.address + ", " + profileDetail.city + ", " + profileDetail.state}</p>
                      </li> */}
                      </ul>
                    </div>
                  </div>
                  <div className="information-detail">
                    <div className="common-header">
                      <h5>Login Details</h5>
                    </div>
                    <div className="information">
                      <ul>
                        {profileDetail.email && (
                          <li className="d-flex justify-content-between pe-5">
                            <span>Email :</span>
                            <div className="d-flex align-items-center ">
                              <a>{profileDetail.email}</a>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-5  col-xl-5 ">
                  <div className="about-img d-xl-block d-none">
                    <img
                      src="/assets/video/video.jpg"
                      className="img-fluid"
                      alt="hello"
                    />
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfileTab;
