import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavbarBrand,
} from "reactstrap";
import Link from "next/link";
import Breadcrumb from "../layout/Breadcrumb/Breadcrumb";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";

const AssetComponent = () => {
  const [assets, setAssets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [status, setStatus] = useState("");
  const [ownercustomerId, setOwnercustomerId] = useState("");
  const [latLong, setLatLong] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      setId(id);

      if (id) {
        axios
          .get(`https://backend.asholproperty.com/ownercustomers/${id}`)
          .then((response) => {
            //setOwnerCustomerId(response.data?.ownercustomerId || "");
            // setLatLong(response.data?.latLong || "");
          })
          .catch((error) => {
            console.error("Error fetching user information:", error);
          });

        axios
          .get(`https://backend.asholproperty.com/user-assets`, {
            params: {
              filter: {
                where: {
                  ownercustomerId: id,
                },
              },
            },
          })
          .then((response) => {
            setAssets(response.data || []);
          })
          .catch((error) => {
            console.error("Error fetching assets:", error);
          });
      }
    }
  }, []);

  const handleFormSubmit = async () => {
    try {
      setModalOpen(false);
      toast.info("Uploading...");

      const formData = new FormData();
      formData.append("file", picture);
      const profilePhotoResponse = await axios.post(
        "https://backend.asholproperty.com/buckets/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const profilePhotoFileName = profilePhotoResponse.data?.fileName || "";

      axios
        .post(`https://backend.asholproperty.com/user-assets`, {
          title: title,
          status: "New Property",
          assetPhotoURL: profilePhotoFileName,
          latLong: latLong,
          localAddress: localAddress,
          ownercustomerId: id,
        })
        .then((response) => {
          setAssets([...assets, response.data]);
          toast.success("Asset added successfully!");
        })
        .catch((error) => {
          console.error("Error uploading asset:", error);
          toast.error("An error occurred. Please try again later.");
        });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <NavbarFive />
      <Breadcrumb />
      <div
        className="dashboard-content"
        style={{
          maxWidth: "1240px",
          margin: "60px auto",
        }}
      >
        <div className="container mt-4 ">
          <div className="row">
            <div className="col-lg-10 col-md-10 mx-auto">
              <div className="row mb-3">
                <button
                  onClick={openModal}
                  style={{ maxWidth: "160px" }}
                  className="btn btn-gradient mt-3 ms-2 "
                >
                  Add New Asset
                </button>
              </div>

              <div className="row d-flex justify-content-center">
                {assets.map((asset) => (
                  <div className="col-md-4 mb-3" key={asset.id}>
                    <div className="card" style={{ opacity: 0.8 }}>
                      <div
                        className="card-body"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <h5 className="card-title">{asset.title}</h5>
                        <img
                          src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${asset.assetPhotoURL}`}
                          alt={asset.title}
                          className="img-fluid"
                          style={{ height: "200px" }}
                        />
                        <p className="card-text">Address: {asset.localAddress}</p>
                      </div>
                      <div className="card-footer text-center">
                        <Link
                          href={`/assets/${asset.id}`}
                          className="btn btn-gradient"
                        >
                          View Properties
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Modal isOpen={modalOpen} toggle={closeModal}>
                <ModalHeader>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>Add New Asset</div>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                      style={{ color: "white" }}
                    >
                      &times;
                    </button>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Picture</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".jpg, .jpeg, .png, .gif"
                      onChange={(e) => setPicture(e.target.files[0])}
                    />
                  </div>

                  <div className="form-group">
                    <label>LatLong(Latitutde,Longitude)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={latLong}
                      onChange={(e) => setLatLong(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Local Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={localAddress}
                      onChange={(e) => setLocalAddress(e.target.value)}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button
                    onClick={handleFormSubmit}
                    className="btn btn-gradient"
                  >
                    Save
                  </button>
                  <button onClick={closeModal} className="btn btn-secondary">
                    Cancel
                  </button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <FooterThree />
    </>
  );
};

export default AssetComponent;
