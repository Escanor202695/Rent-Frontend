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
import NavbarThree from "../../layout/headers/NavbarThree";
import { Footer } from "rsuite";
import FooterThree from "../../layout/footers/FooterThree";
const AssetProperty = () => {
  const router = useRouter();
  const { id } = router.query;
  const [properties, setProperties] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [waterBill, setWaterBill] = useState("");
  const [gasBill, setGasBill] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [latLong, setLatLong] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://backend.asholproperty.com/user-assets/${id}`)
        .then((response) => {
          setLatLong(response.data?.latLong || "");
        })
        .catch((error) => {
          console.error("Error fetching latLong:", error);
        });

      axios
        .get(`https://backend.asholproperty.com/assets-properties`, {
          params: {
            filter: {
              where: {
                assetId: id,
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
        assetId: id,
        latLong,
        status: "pending",
        title,
        rentAmount,
        waterBill,
        gasBill,
        serviceCharge,
      };

      await axios.post(
        `https://backend.asholproperty.com/assets-properties`,
        newProperty
      );
      setProperties([...properties, newProperty]);
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding new property:", error);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      style={{
        paddingTop: "120px",
        maxWidth: "1240px",
        margin: "0 auto",
      }}
    >
      <NavbarThree />
      <div className="container mt-4">
        <button onClick={openModal} className="mb-3 btn btn-gradient">
          Add New Property
        </button>

        <Table striped bordered>
          <thead>
            <tr>
              <th>Title</th>
              <th>Rent Amount</th>
              <th>Water Bill</th>
              <th>Gas Bill</th>
              <th>Service Charge</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No properties found. Add a new property.
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.title}</td>
                  <td>{property.rentAmount}</td>
                  <td>{property.waterBill}</td>
                  <td>{property.gasBill}</td>
                  <td>{property.serviceCharge}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => console.log("Hello")}
                    >
                      Request
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Modal isOpen={modalOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>Add New Property</ModalHeader>
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
            <Button color="primary" onClick={handleFormSubmit}>
              Save
            </Button>
            <Button color="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <FooterThree />
    </div>
  );
};

export default AssetProperty;
