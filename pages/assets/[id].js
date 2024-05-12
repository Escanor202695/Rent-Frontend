import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
} from "reactstrap";
import axios from "axios";
import NavbarFive from "../../layout/headers/NavbarFive";
import Breadcrumb from "../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../layout/footers/FooterThree";

const AssetProperty = () => {
  const router = useRouter();
  const { id } = router.query;
  const [properties, setProperties] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [requestListingModalOpen, setRequestListingModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [waterBill, setWaterBill] = useState("");
  const [gasBill, setGasBill] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [latLong, setLatLong] = useState("");
  const [ownerCustomerId, setOwnerCustomerId] = useState("");
  const [area, setArea] = useState("");
  const [subArea, setSubArea] = useState("");
  const [date, setDate] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [pId, setPId] = useState("");
  const [localAddress, setLocalAddress] = useState("");
  const [editingProperty, setEditingProperty] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://backend.asholproperty.com/user-assets/${id}`)
        .then((response) => {
          //console.log(response.data);
          setLatLong(response.data?.latLong || "");
          setOwnerCustomerId(response.data?.ownercustomerId || "");
          fetchAreaAndSubArea(response.data?.ownercustomerId);
          setLocalAddress(response.data?.localAddress);
        })
        .catch((error) => {
          console.error("Error fetching latLong and ownerCustomerId:", error);
        });

      axios
        .get(`https://backend.asholproperty.com/assets-properties`, {
          params: {
            filter: {
              where: {
                userAssetsId: id,
              },
            },
          },
        })
        .then((response) => {
          setProperties(response.data || []);
        })
        .catch((error) => {
          console.error("Error fetching properties:", error);
        });
    }
  }, [id]);

  const handleFormSubmit = async () => {
    try {
      const newProperty = {
        userAssetsId: id,
        status: "Vacant",
        latLong: latLong,
        title: title,
        rentAmount: rentAmount,
        waterBill: waterBill,
        gasBill: gasBill,
        serviceCharge: serviceCharge,
        proertyPhotoURLs: [],
        localAddress: localAddress,
      };

      await axios.post("https://backend.asholproperty.com/assets-properties", {
        userAssetsId: id,
        status: "Vacant",
        latLong: latLong,
        title: title,
        rentAmount: rentAmount,
        waterBill: waterBill,
        gasBill: gasBill,
        serviceCharge: serviceCharge,
        propertyPhotoURLs: [],
      });
      setProperties([...properties, newProperty]);
      
      setModalOpen(false);
      window.location.reload(); // Refresh the window after form submission
    } catch (error) {
      console.error("Error adding new property:", error);
    }
  };

  const fetchAreaAndSubArea = (customerId) => {
    axios
      .get(`https://backend.asholproperty.com/ownercustomers/${customerId}`)
      .then((response) => {
        setArea(response.data?.areaId || "");

        setSubArea(response.data?.subAreaId || "");
      })
      .catch((error) => {
        console.error("Error fetching area and subarea:", error);
      });
  };

  const handleRequestListing = async () => {
    try {
      const requestData = {
        date: date,
        timeFrame: timeFrame,
        latLong: latLong,
        ownercustomerId: ownerCustomerId,
        assetsPropertyId: pId, // Use the pId state here
        userAssetsId: id,
        areaId: area,
        subareaId: subArea,
        status: "Requested",
      };
      //console.log(requestData);
      await axios.post(
        "https://backend.asholproperty.com/request-listings",
        requestData
      );
      await axios.patch(
        `https://backend.asholproperty.com/assets-properties/${pId}`,
        {
          status: "Requested",
        }
      );
  
      setRequestListingModalOpen(false);
      window.location.reload(); // Refresh the window after form submission
    } catch (error) {
      console.error("Error requesting listing:", error);
    }
  };
  

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openRequestListingModal = (id) => {
    setRequestListingModalOpen(true);
  };
  

  const closeRequestListingModal = () => {
    setRequestListingModalOpen(false);
  };
  const openEditModal = (property) => {
    setEditingProperty(property);
  };

  const closeEditModal = () => {
    setEditingProperty(null);
  };

  const handleEditSubmit = async () => {
    try {
      // Prepare updated property data
      const updatedProperty = {
        title: editingProperty.title,
        rentAmount: editingProperty.rentAmount,
        waterBill: editingProperty.waterBill,
        gasBill: editingProperty.gasBill,
        serviceCharge: editingProperty.serviceCharge,
        // ... other fields
      };

      await axios.patch(
        `https://backend.asholproperty.com/assets-properties/${editingProperty.id}`,
        updatedProperty
      );
      axios
        .get(`https://backend.asholproperty.com/assets-properties`, {
          params: {
            filter: {
              where: {
                userAssetsId: id,
              },
            },
          },
        })
        .then((response) => {
          setProperties(response.data || []);
        })
        .catch((error) => {
          console.error("Error fetching properties:", error);
        });

      closeEditModal();
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  return (
    <div>
      <NavbarFive />
      <Breadcrumb name="Property" />
      <div
        style={{
          maxWidth: "1240px",
          margin: "60px auto",
        }}
      >
        <div className="container mt-4">
          <button onClick={openModal} className="mb-2 btn btn-gradient">
            Add New Property
          </button>
          <div className="container mt-4">
            <div className="property-table">
              <Table striped bordered className="text-center">
                <thead>
                  <tr>
                    <th>Listing</th>
                    <th>Property_Id</th>
                    <th>Title</th>
                    <th>Rent_Amount</th>
                    <th>Water_Bill</th>
                    <th>Gas_Bill</th>
                    <th>Service_Charge</th>
                    <th>Status</th>
                    <th>Edit Property</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No properties found. Add a new property.
                      </td>
                    </tr>
                  ) : (
                    properties.map((property, i) => (
                      <tr key={property.id}>
                        <td>
                        <Button
                        color="primary"
                        style={{ width: "150px" }}
                        onClick={() => {
                          openRequestListingModal(property.id);
                          setPId(property.id); // Set the pId state here
                        }}
                        disabled={property.status !== "Vacant"}
                      >
                        Request Listing
                      </Button>
                      
                        </td>

                        <td>{property.id}</td>
                        <td>{property.title}</td>
                        <td>{property.rentAmount}</td>
                        <td>{property.waterBill}</td>
                        <td>{property.gasBill}</td>
                        <td>{property.serviceCharge}</td>
                        <td>{property.status}</td>

                        <td>
                          <Button
                            color="primary"
                            style={{ width: "70px" }}
                            onClick={() => setEditingProperty(property)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
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
                <div>Add New Property</div>
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
                <label>Rent Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Water Bill</label>
                <input
                  type="text"
                  className="form-control"
                  value={waterBill}
                  onChange={(e) => setWaterBill(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Gas Bill</label>
                <input
                  type="text"
                  className="form-control"
                  value={gasBill}
                  onChange={(e) => setGasBill(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Service Charge</label>
                <input
                  type="text"
                  className="form-control"
                  value={serviceCharge}
                  onChange={(e) => setServiceCharge(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <button onClick={handleFormSubmit} className="btn btn-gradient">
                Save
              </button>
              <button className="btn btn-danger" onClick={closeModal}>
                Cancel
              </button>
            </ModalFooter>
          </Modal>

          {/* Request Listing Modal */}
          <Modal
            isOpen={requestListingModalOpen}
            toggle={closeRequestListingModal}
          >
            <ModalHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>Request Listing</div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeRequestListingModal}
                  style={{ color: "white" }}
                >
                  &times;
                </button>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  min={currentDate} // Set the minimum allowed date to the current date

                  // Add state and onChange handler for the date field
                  placeholder="Choose Date"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Timeframe</label>
                <input
                  type="time"
                  className="form-control"
                  value={timeFrame}
                  // Add state and onChange handler for the timeframe field
                  placeholder="Enter TimeFrame"
                  onChange={(e) => setTimeFrame(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Latitude and Longitude (LatLong)</label>
                <input
                  type="text"
                  className="form-control"
                  value={latLong}
                  readOnly
                  placeholder={latLong}
                />
              </div>
              {/* Add other fields for latLong, ownerCustomerId, userAssetsId, areaId, subareaId */}
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-gradient"
                onClick={handleRequestListing}
              >
                Submit
              </button>
              <button
                className="btn btn-danger"
                onClick={closeRequestListingModal}
              >
                Cancel
              </button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={editingProperty !== null} toggle={closeEditModal}>
            <ModalHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>Edit Property</div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeEditModal}
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
                  value={editingProperty?.title || ""}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Rent Amount</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingProperty?.rentAmount || ""}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      rentAmount: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Water Bill</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingProperty?.waterBill || ""}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      waterBill: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Gas Bill</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingProperty?.gasBill || ""}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      gasBill: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Service Charge</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingProperty?.serviceCharge || ""}
                  onChange={(e) =>
                    setEditingProperty({
                      ...editingProperty,
                      serviceCharge: e.target.value,
                    })
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <button onClick={handleEditSubmit} className="btn btn-gradient">
                Update
              </button>
              <button className="btn btn-danger" onClick={closeEditModal}>
                Cancel
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
      <FooterThree />
    </div>
  );
};

export default AssetProperty;
