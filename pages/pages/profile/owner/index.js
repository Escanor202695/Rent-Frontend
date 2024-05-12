import React, { useState, useEffect } from "react";
import { Mail, MapPin } from "react-feather";
import { Row, Col, Nav } from "reactstrap";
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
                    {profileDetail.fullName}{" "}
                    <span className="label label-success px-4 mx-2">
                      Ashol Property owner
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
                        <li>
                          <span>Nid Number :</span>
                          <a>{profileDetail.nidNumber}</a>
                        </li>
                        <li>
                          <span>Address :</span>
                          <p>
                            {profileDetail.houseNo +
                              ", " +
                              profileDetail.roadNo +
                              ", " +
                              profileDetail.local_address +
                              "," +
                              profileDetail.division}
                          </p>
                        </li>
                        <li>
                          <span>Membership Type :</span>
                          <a>{profileDetail.membershipType}</a>
                        </li>
                        <li>
                          <span>Profile Picture :</span>
                          <a>
                            <img
                              src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${profileDetail.profilePhotoURL}`}
                              alt="Profile Picture"
                              style={{ width: "150px", height: "150px" }}
                            />
                          </a>
                        </li>
                        <li>
                          <span>Nid Copy :</span>
                          <a>
                            <img
                              src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${profileDetail.nidURL}`}
                              alt="Nid Picture"
                              style={{ width: "150px", height: "150px" }}
                            />
                          </a>
                        </li>
                        <li>
                          <span>Sign Copy :</span>
                          <a>
                            <img
                              src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${profileDetail.signatureURL}`}
                              alt="Sign Picture"
                              style={{ width: "150px", height: "150px" }}
                            />
                          </a>
                        </li>
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
