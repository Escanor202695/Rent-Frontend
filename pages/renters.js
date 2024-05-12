import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Invoice from "../components/invoice/invoice";
import axios from "axios";
import NavbarFive from "../layout/headers/NavbarFive";
import Breadcrumb from "../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../layout/footers/FooterThree";

const Renters = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [renterToDelete, setRenterToDelete] = useState(null);
  const [thirdModalOpen, setThirdModalOpen] = useState(false);
  const [fourthModalOpen, setFourthModalOpen] = useState(false);
  const [rentersData, setRentersData] = useState([]);
  const [selectedRenter, setSelectedRenter] = useState(null);
  const [invoiceData, setInvoiceData] = useState({});
  const [editRenter, setEditRenter] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({});
  const [pid, setPid] = useState("");
  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleSecondModal = () => setSecondModalOpen(!secondModalOpen);
  const toggleThirdModal = () => setThirdModalOpen(!thirdModalOpen);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState({}); // State for selected asset
  const [propertyOptions, setPropertyOptions] = useState([]); // State for property options

  const generateMonthsOptions = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months;
  };

  const initialValues = { renterId: "", propertyId: "", assetId: "" };

  const validationSchema = Yup.object().shape({
    renterId: Yup.string().required("Renter ID is required"),
    propertyId: Yup.string().required("Property ID is required"),
    assetId: Yup.string().required("Asset ID is required"),
  });

  useEffect(() => {
    fetchRentersData();
    fetchAssets();
  }, []);

  const handleAssetSelect = async (selectedAssetId) => {
    const selectedAsset = assets.find((asset) => asset.id === selectedAssetId);
    setSelectedAsset(selectedAsset);
  };

  // Function to fetch property options based on the selected asset
  const fetchProperties = async (assetId) => {
    try {
      const response = await axios.get(
        "https://backend.asholproperty.com/assets-properties",
        {
          params: {
            filter: {
              where: {
                userassetId: assetId,
              },
            },
          },
        }
      );
      setPropertyOptions(response.data);
    } catch (error) {
      console.error("Error fetching property options:", error);
    }
  };

  const fetchAssets = async () => {
    const ownerid = localStorage.getItem("id");
    try {
      const response = await axios.get(
        "https://backend.asholproperty.com/user-assets",
        {
          params: {
            filter: {
              where: {
                ownercustomerId: ownerid,
              },
            },
          },
        }
      );
      setAssets(response.data);
      console.log("fetch assets", response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const fetchRentersData = async () => {
    try {
      // Fetch renters data using localStorage
      const id = localStorage.getItem("id"); // You need to implement localStorage usage
      const response = await axios.get(
        `https://backend.asholproperty.com/renters/`,
        {
          params: {
            filter: {
              where: {
                ownerId: id,
              },
            },
          },
        }
      );
      console.log(response.data);
      setRentersData(response.data);
    } catch (error) {
      console.error("Error fetching renters data:", error);
    }
  };

  const handleEditSubmit = async (values) => {
    try {
      const response = await axios.patch(
        `https://backend.asholproperty.com/renters/${editRenter.id}`,
        {
          rentAmount: values.rentAmount,
        }
      );

      // Update the rentersData with the edited renter
      setRentersData((prevData) =>
        prevData.map((renter) =>
          renter.id === editRenter.id
            ? { ...renter, rentAmount: response.data.rentAmount }
            : renter
        )
      );

      toggleFourthModal();
    } catch (error) {
      console.error("Error editing renter:", error);
    }
  };

  const handleDeleteClick = (renter) => {
    setRenterToDelete(renter);
    handleDeleteRenter();
  };

  const handleAddRenter = async (values, { resetForm }) => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.post(
        "https://backend.asholproperty.com/renters",
        {
          customerId: values.renterId,
          assetsPropertyId: values.propertyId,
          status: "Active",
          ownerId: id,
          deedsUrl: "Unavailable",
        }
      );
      await axios.patch(
        `https://backend.asholproperty.com/assets-properties/${values.propertyId}`,
        {
          status: "Occupied",
        }
      );
      const newRenter = response.data;

      setRentersData((prevData) => [...prevData, newRenter]);
      resetForm();
      toggleModal();
    } catch (error) {
      console.error("Error adding renter:", error);
    }
  };

  const handleDeleteRenter = async () => {
    try {
      console.log(renterToDelete);
      await axios.patch(
        `https://backend.asholproperty.com/property-items/${renterToDelete.assetsPropertyId}`,
        {
          status: "Live",
        }
      );
      await axios.patch(
        `https://backend.asholproperty.com/assets-properties/${renterToDelete.assetsPropertyId}`,
        {
          status: "Vacant",
        }
      );

      await axios.delete(
        `https://backend.asholproperty.com/renters/${renterToDelete.id}`
      );

      const updatedRenters = rentersData.filter(
        (renter) => renter.id !== renterToDelete.id
      );
      setRentersData(updatedRenters);
      setRenterToDelete(null);
    } catch (error) {
      console.error("Error deleting renter:", error);
    }
  };

  const generateYearsOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 1; i <= currentYear + 5; i++) {
      years.push(i.toString());
    }
    return years;
  };

  const handleGenerateInvoice = (renter) => {
    setSelectedRenter(renter);
    ////console.log(selectedRenter)
    toggleSecondModal();
  };

  const handleGenerateInvoiceSubmit = async (values) => {
    try {
      let address;
      let addressAsset;
      let propertyDetailsResponse = null;

      try {
        const response = await axios.get(
          `https://backend.asholproperty.com/assets-properties/${selectedRenter.assetsPropertyId}`
        );
        propertyDetailsResponse = response.data;
        setPropertyDetails(propertyDetailsResponse);
        console.log(propertyDetailsResponse);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }

      if (propertyDetailsResponse) {
        const id = localStorage.getItem("id");
        try {
          const response = await axios.get(
            `https://backend.asholproperty.com/property-items/${selectedRenter.assetsPropertyId}`
          );
          address = response.data.localAddress;
          //console.log("my goodness")

        } catch (error) {
          console.error("Error fetching property details:", error);
        }
        try {
          const responseAssets = await axios.get(`https://backend.asholproperty.com/user-assets/${userAssetsId}
         `);
          addressAsset = responseAssets.data.localAddress;
        } catch (error) {
          console.log("Error fetching property details:", error);
        }

        setInvoiceData({
          year: values.year,
          month: values.month,
          title: propertyDetailsResponse.title,
          ownersName: selectedRenter.owner?.fullName,
          gasBill: propertyDetailsResponse.gasBill,
          waterBill: propertyDetailsResponse.waterBill,
          serviceCharge: propertyDetailsResponse.serviceCharge,
          tenantsName: selectedRenter.customer?.fullName,
          address: address || addressAsset,
          propertyId: selectedRenter.assetsPropertyId,
          renterId: selectedRenter.customerId,
          rentAmount: propertyDetailsResponse.rentAmount,
          ownerId: id,
          renterId: selectedRenter.customerId,
          status: "new invoice",
        });
        try {
          await axios.post(
            "https://backend.asholproperty.com/rent-managements",
            {
              year: values.year,
              month: values.month,
              title: propertyDetailsResponse.title,
              ownersName: selectedRenter.owner?.fullName,
              gasBill: propertyDetailsResponse.gasBill,
              waterBill: propertyDetailsResponse.waterBill,
              serviceCharge: propertyDetailsResponse.serviceCharge,
              tenantsName: selectedRenter.customer?.fullName,
              address: address || addressAsset,
              propertyId: selectedRenter.assetsPropertyId,
              renterId: selectedRenter.customerId,
              rentAmount: propertyDetailsResponse.rentAmount,
              ownerId: id,
              renterId: selectedRenter.customerId,
              status: "new invoice",
            }
          );
          //console.log("Invoice data posted successfully");
        } catch (error) {
          console.error("Error posting invoice data:", error);
        }
        toggleSecondModal();
        toggleThirdModal();
      }
    } catch (error) {
      console.error("Error generating or uploading PDF:", error);
    }
  };

  return (
    <div>
      <NavbarFive />
      <Breadcrumb />
      <div style={{ padding: "20px 10%", maxWidth: "100%" }}>
        <Button className="btn btn-gradient mb-4" onClick={toggleModal}>
          Add Renter
        </Button>

        <div style={{ maxWidth: "100%", overflow: "scroll" }}>
          <Table
            bordered={true}
            borderless={false}
            className="table-bordered text-center"
          >
            <thead>
              <tr>
                <th>Sl</th>
                <th>Renter_ID</th>
                <th>Renter_Name</th>
                <th>Photo</th>
                <th>Property_Id</th>
                <th>Property_Title</th>
                <th>Invoice</th>
                <th>Profile</th>
                <th>Delete_Renter</th>
              </tr>
            </thead>
            <tbody>
              {rentersData.map((renter, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{renter?.customerId}</td>
                  <td>{renter?.customer?.fullName}</td>
                  <td className="w">
                    <img
                      src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${renter.customer?.profilePhotoURL}`}
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{renter?.assetsPropertyId}</td>
                  <td>{renter?.property?.title}</td>
                  <td>
                    <Button
                      color="success"
                      onClick={() => handleGenerateInvoice(renter)}
                    >
                      Invoice
                    </Button>
                  </td>
                  <td>
                    <Button color="primary">
                      <Link
                        href={`/renter-profile/${renter.customerId}`}
                        className="link"
                      >
                        Profile
                      </Link>
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => handleDeleteClick(renter)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Add Renter</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleAddRenter}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="renterId">Renter ID</Label>
                    <Input
                      type="text"
                      name="renterId"
                      id="renterId"
                      value={values.renterId}
                      onChange={handleChange}
                      invalid={touched.renterId && !!errors.renterId}
                    />
                    <ErrorMessage
                      name="renterId"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="aseetId">Select Asset</Label>
                    <Field
                      as="select"
                      name="assetId"
                      id="assetId"
                      className="form-control"
                      onChange={(e) => {
                        handleAssetSelect(e.target.value);
                        handleChange(e);
                        fetchProperties();
                      }}
                      value={values.assetId}
                    >
                      <option value="">Select Asset</option>
                      {assets.map((asset) => (
                        <option key={asset.id} value={asset.id}>
                          {asset.title}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="assetId"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="propertyId">Select Property</Label>
                    <Field
                      as="select"
                      name="propertyId"
                      id="propertyId"
                      className="form-control"
                      disabled={!selectedAsset} // Disable the field until an asset is selected
                    >
                      <option value="">Select Property</option>
                      {propertyOptions.map((property) => (
                        <option key={property.id} value={property.id}>
                          {property.title}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="propertyId"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>

                  <Button type="submit" className="btn btn-gradient">
                    Add Renter
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>

        <Modal isOpen={secondModalOpen} toggle={toggleSecondModal}>
          <ModalHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>Generate Invoice</div>
              <button
                type="button"
                className="btn-close"
                onClick={toggleSecondModal}
                style={{ color: "white" }}
              >
                &times;
              </button>
            </div>
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{ year: "", month: "" }}
              validationSchema={Yup.object().shape({
                year: Yup.string().required("Year is required"),
                month: Yup.string().required("Month is required"),
              })}
              onSubmit={handleGenerateInvoiceSubmit}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="year">Year</Label>
                    <Field
                      as="select"
                      name="year"
                      id="year"
                      className="form-control"
                    >
                      <option value="">Select Year</option>
                      {generateYearsOptions().map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="year"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="month">Month</Label>
                    <Field
                      as="select"
                      name="month"
                      id="month"
                      className="form-control"
                    >
                      <option value="">Select Month</option>
                      {generateMonthsOptions().map((month, index) => (
                        <option key={index} value={month}>
                          {month}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="month"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>

                  <Button type="submit" className="btn btn-gradient">
                    Generate Invoice
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>

        <Modal isOpen={thirdModalOpen} toggle={toggleThirdModal} size="lg">
          <ModalHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>Invoice</div>
              <button
                type="button"
                className="btn-close"
                onClick={toggleThirdModal}
                style={{ color: "white" }}
              >
                &times;
              </button>
            </div>
          </ModalHeader>
          <ModalBody>
            <Invoice invoiceData={invoiceData} />
          </ModalBody>
        </Modal>
      </div>
      <FooterThree />
    </div>
  );
};

export default Renters;
