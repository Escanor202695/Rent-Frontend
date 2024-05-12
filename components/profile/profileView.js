import React, { useState, useEffect } from "react";
import { MapPin, Mail } from "react-feather";
import axios from "axios";
import {
  Container,
  Card,
  CardBody,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Link from "next/link";
//import { Document, Page } from 'react-pdf';

function ProfileView({
  role,
  profileDetail,
  setModalOpen,
  public_view = "false",
}) {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [deals, setDeals] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(true); // State for the loading status
  const [loading2, setLoading2] = useState(true); // State for the loading status

  const handleIframeLoad = (no) => {
    if (no == 1) setLoading(false);
    else setLoading2(false);
  };

  // Function to open the PDF modal
  const openPdfModal = (no) => {
    if (no === 1) setModal(true);
    else setModal2(true);
    setPageNumber(1);
  };

  console.log(profileDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend.asholproperty.com/close-deals",
          {
            params: {
              filter: {
                where: {
                  ownercustomerId: role == "owner" && profileDetail.id,
                  renterId: role == "customer" && profileDetail.id,
                },
              },
            },
          }
        );
        setDeals(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="my-5" style={{ width: "500px", maxWidth: "100%" }}>
      <Card className="p-0 border-0">
        <CardBody className="p-2">
          <div className="profile-top d-flex align-items-center mb-3 gap-4">
            <div className="text-center">
              {profileDetail?.profilePhotoURL && (
                <img
                  className="rounded-circle img-fluid profile-img"
                  src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${profileDetail.profilePhotoURL}`}
                  alt="Profile Picture"
                />
              )}
            </div>
            <div className="text-center text-md-start">
              <div className="d-flex gap-4 profile-alignment">
                <h2 className="mb-0 fw-bold">{profileDetail.fullName}</h2>
              </div>
              <ul className="list-unstyled mt-2">
                <li className="d-flex align-items-center">
                  <Mail className="me-2" />
                  <span>{profileDetail.email}</span>
                </li>
              </ul>
              <Button
                type="button"
                onClick={() => setModalOpen(true)}
                className="btn btn-gradient p-2 px-3 mt-"
                style={{ fontSize: "12px" }}
              >
                Edit Profile
              </Button>
            </div>
          </div>
          <hr className="my-2" />
          <div className="d-flex flex-column">
            <div className="profile-detail">
              <div
                className="fw-bold mb-1 w-50"
                style={{ textTransform: "capitalize" }}
              >
                {profileDetail.role} ID:
              </div>
              <div className="w-50">{profileDetail.id}</div>
            </div>
            <div className="profile-detail">
              <div className="fw-bold mb-1 w-50">Name:</div>
              <div className="w-50">{profileDetail.fullName}</div>
            </div>

            <div className="profile-detail">
              <div className="fw-bold mb-1 w-50">Birth Date:</div>
              <div>{profileDetail.date_of_birth}</div>
            </div>

            <div className="profile-detail">
              <div className="fw-bold mb-1 w-50">Gender:</div>
              <div>{profileDetail.gender}</div>
            </div>
            <div className="profile-detail">
              <div className="fw-bold mb-1 w-50">Phone Number:</div>
              <div>{profileDetail.mobile_number}</div>
            </div>
            <div className="profile-detail">
              <div className="fw-bold mb-1 w-50">Role:</div>
              <div>{profileDetail.role}</div>
            </div>
            <div className="profile-detail">
              <div className="fw-bold mb-1 w-50">NID Number:</div>
              <div className="w-50">{profileDetail.nidNumber}</div>
            </div>
            <div className="profile-detail">
              <div className="fw-bold mb-1 w-50">Address:</div>
              <div className="w-50">{profileDetail.local_address}</div>
            </div>

            {role === "owner" && (
              <div className="profile-detail">
                <div className="fw-bold mb-1 w-50">Membership Type:</div>

                <div>{profileDetail.membershipType || "free"}</div>
                {(profileDetail.membershipType !== "grand_premium") && (
                  <div>
                    <Button
                      type="button"
                      onClick={() => setModal3(!modal3)}
                      className="btn btn-gradient p-2 px-3 mt-2 ms-4"
                      style={{ fontSize: "12px" }}
                    >
                      Upgrade ?
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="profile-detail">
            <div className="fw-bold w-50 mt-2">NID</div>
            <a
            href={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${profileDetail.nidURL}`}
            rel="noopener noreferrer"
            className="btn btn-gradient"
          >
            View NID
          </a>
          </div>

          {role == "owner" && (
            <div className="profile-detail mt-4">
              <div className="fw-bold w-50 mt-2">Agreement</div>
              <a
              href={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${profileDetail.signatureURL}`}
              rel="noopener noreferrer"
              className="btn btn-gradient"
            >
              View Agreement
            </a>
            </div>
          )}
          {public_view !== "true" && (
            <div className="profile-detail mt-4">
              <div className="fw-bold w-50 mt-2">Deeds</div>
              <div className="w-50">
                <Link
                  href={{
                    pathname: "/deeds",
                    query: { id: profileDetail.id, role: role },
                  }}
                >
                  <Button className="btn btn-gradient">View Deeds</Button>
                </Link>
              </div>
            </div>
          )}
          {public_view !== "true" && (
            <div className="profile-detail mt-4">
              <div className="fw-bold w-50 mt-2">Invoices</div>
              <div className="w-50">
                <Link
                  href={{
                    pathname: "/invoice",
                    query: { id: profileDetail.id, role: role },
                  }}
                >
                  <Button className="btn btn-gradient">View Invoices</Button>
                </Link>
              </div>
            </div>
          )}
        </CardBody>
        <Modal isOpen={modal3} toggle={() => setModal3(!modal3)}>
          <ModalHeader>Want to upgrade membership?</ModalHeader>
          <ModalBody style={{ fontSize: "20px" }}>
            Call Us Now -{">"}{" "}
            <span className="fw-bold" style={{ color: "#00B160" }}>
              09613825455
            </span>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-gradient"
              onClick={() => setModal3(!modal3)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Card>

      {/* PDF Modal */}
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>Your NID</ModalHeader>
        <ModalBody>
          {loading && (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          )}
          <iframe
            title="NID PDF"
            src={`https://drive.google.com/viewerng/viewer?embedded=true&url=https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${profileDetail.nidURL}`}
            width="100%"
            height="500px"
            style={{ border: "none" }}
            onLoad={() => handleIframeLoad(1)} // Call this function when the iframe content has loaded
          ></iframe>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-gradient" onClick={() => setModal(!modal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal2} toggle={() => setModal2(!modal)}>
        <ModalHeader>Your Agreement</ModalHeader>
        <ModalBody>
          {loading2 && (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          )}
          <iframe
            title="Agreement PDF"
            src={`https://drive.google.com/viewerng/viewer?embedded=true&url=https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${profileDetail.signatureURL}`}
            width="100%"
            height="500px"
            style={{ border: "none" }}
            onLoad={() => handleIframeLoad(2)} // Call this function when the iframe content has loaded
          ></iframe>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn btn-gradient"
            onClick={() => setModal2(!modal2)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default ProfileView;
