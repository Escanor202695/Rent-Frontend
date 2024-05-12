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
import Invoice from "../../components/invoice/invoice";
import axios from "axios";
import NavbarFive from "../../layout/headers/NavbarFive";
import Breadcrumb from "../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../layout/footers/FooterThree";
import { useRouter } from "next/router";
import InvoiceTable from "../../components/invoice";

const Renters = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);

  const [renterToDelete, setRenterToDelete] = useState(null);
  const [thirdModalOpen, setThirdModalOpen] = useState(false);
  const [rentersData, setRentersData] = useState([]);
  const [selectedRenter, setSelectedRenter] = useState(null);
  const [invoiceData, setInvoiceData] = useState({});
  const [editRenter, setEditRenter] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({});
  const [pid, setPid] = useState("");
  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleSecondModal = () => setSecondModalOpen(!secondModalOpen);
  const toggleThirdModal = () => setThirdModalOpen(!thirdModalOpen);
  const [nidPdfModalOpen, setNidPdfModalOpen] = useState(false);
  const [deedsPdfModalOpen, setDeedsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      setOwnerId(id);
      console.log("owner", id);
    }
  }, []);

  useEffect(() => {
    console.log("renter", selectedRenter);
  }, [selectedRenter]);

  const toggleDeleteConfirmationModal = () =>
    setDeleteConfirmationModalOpen(!deleteConfirmationModalOpen);

  const handleDeleteClick = (renter) => {
    setRenterToDelete(renter);
    toggleDeleteConfirmationModal();
  };

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

  useEffect(() => {
    fetchRentersData();
  }, [id]);

  const toggleNidPdfModal = (pdfUrl) => {
    setPdfUrl(pdfUrl);
    setNidPdfModalOpen(!nidPdfModalOpen);
  };

  const toggleDeedsPdfModal = (pdfUrl) => {
    setPdfUrl(pdfUrl);
    setDeedsPdfModalOpen(!deedsPdfModalOpen);
  };

  const fetchRentersData = async () => {
    try {
      const response = await axios.get(
        `https://backend.asholproperty.com/renters/`,
        {
          params: {
            filter: {
              where: {
                customerId: id,
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

  const handleDeleteRenter = async () => {
    try {
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
      router.push("/dashboard");

      //this api calling at last because it may create error when property-items witth this id doesnt exist
      await axios.patch(
        `https://backend.asholproperty.com/property-items/${renterToDelete.assetsPropertyId}`,
        {
          status: "Vacant",
        }
      );
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
    toggleSecondModal();
  };

  const handleGenerateInvoiceSubmit = async (values) => {
    try {
      let address;
      let addressAsset;
      let propertyDetailsResponse = null;

      const response = await axios.get(
        `https://backend.asholproperty.com/assets-properties/${selectedRenter.assetsPropertyId}`
      );
      propertyDetailsResponse = response.data;
      setPropertyDetails(propertyDetailsResponse);

      const id = localStorage.getItem("id");
      const responseAssets = await axios.get(
        `https://backend.asholproperty.com/user-assets/${response?.data?.userAssetsId}`
      );

      addressAsset = responseAssets.data.localAddress;
      console.log("ad", responseAssets.data);
      setInvoiceData({
        year: values.year,
        month: values.month,
        title: propertyDetailsResponse.title,
        ownersName: selectedRenter.owner?.fullName,
        gasBill: propertyDetailsResponse.gasBill,
        waterBill: propertyDetailsResponse.waterBill,
        serviceCharge: propertyDetailsResponse.serviceCharge,
        tenantsName: selectedRenter.customer?.fullName,
        address: addressAsset || "no address",
        propertyId: selectedRenter.assetsPropertyId,
        renterId: selectedRenter.customerId,
        rentAmount: propertyDetailsResponse.rentAmount,
        ownerId: id,
        renterId: selectedRenter.customerId,
        status: "new invoice",
        assetTitle: responseAssets.data.title,
      });
      try {
        await axios.post("https://backend.asholproperty.com/rent-managements", {
          year: values.year,
          month: values.month,
          title: propertyDetailsResponse.title,
          ownersName: selectedRenter.owner?.fullName,
          gasBill: propertyDetailsResponse.gasBill,
          waterBill: propertyDetailsResponse.waterBill,
          serviceCharge: propertyDetailsResponse.serviceCharge,
          tenantsName: selectedRenter.customer?.fullName || "demo name",
          address: address || addressAsset || "no address",
          propertyId: selectedRenter.assetsPropertyId,
          renterId: selectedRenter.customerId,
          rentAmount: propertyDetailsResponse.rentAmount,
          ownerId: id,
          renterId: selectedRenter.customerId,
          status: "new invoice",
          assetTitle: responseAssets.data.title,
        });
        //console.log("Invoice data posted successfully");
      } catch (error) {
        console.error("Error posting invoice data:", error);
      }
      toggleSecondModal();
      //toggleThirdModal();
      window.location.reload();
    } catch (error) {
      console.error("Error generating or uploading PDF:", error);
    }
  };

  return (
    <div>
      <NavbarFive />
      <Breadcrumb />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 style={{ marginTop: "60px", fontWeight: "600" }}>Manage Renter</h2>
        <div style={{ width: "600px", marginTop: "50px" }} className="cont">
          {rentersData?.map((renter, i) => (
            <div className="d-flex justify-content-between inner-cont" key={i}>
              <div className="w-50 d-flex flex-column gap-2">
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: "20px" }}
                >
                  <div>Name:</div>
                  <div className="w-50">{renter?.customer?.fullName}</div>
                </div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: "20px" }}
                >
                  <div>Email:</div>
                  <div className="w-50">{renter?.customer?.email}</div>
                </div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: "20px" }}
                >
                  <div>Phone:</div>
                  <div className="w-50">{renter?.customer?.mobile_number}</div>
                </div>
              </div>
              <div className="action-btns">
                <a
                  href={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${rentersData[0]?.customer?.nidURL}`}
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View NID
                </a>
                {renter.deedsUrl !== "Unavailable" && (
                  <a
                    href={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${rentersData[0]?.deedsUrl}`}
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    View Deed
                  </a>
                )}

                <Button
                  color="danger"
                  onClick={() => handleDeleteClick(renter)}
                >
                  Delete Renter
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="btn btn-gradient mt-4"
          onClick={() => handleGenerateInvoice(rentersData[0])}
        >
          Create Invoice
        </Button>
        {ownerId && <InvoiceTable ownerId={ownerId} customerId={id} />}

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

        <Modal isOpen={nidPdfModalOpen} toggle={toggleNidPdfModal}>
          <ModalHeader>NID PDF</ModalHeader>
          <ModalBody>
            <iframe
              title="NID PDF"
              src={`https://drive.google.com/viewerng/viewer?embedded=true&url=https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${rentersData[0]?.customer?.nidURL}`}
              width="100%"
              height="500px"
              style={{ border: "none" }}
            ></iframe>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-gradient" onClick={toggleNidPdfModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={deedsPdfModalOpen} toggle={toggleDeedsPdfModal}>
          <ModalHeader>Deeds PDF</ModalHeader>
          <ModalBody>
            <iframe
              title="NID PDF"
              src={`https://drive.google.com/viewerng/viewer?embedded=true&url=https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${rentersData[0]?.deedsUrl}`}
              width="100%"
              height="500px"
              style={{ border: "none" }}
            ></iframe>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-gradient" onClick={toggleDeedsPdfModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={deleteConfirmationModalOpen}
          toggle={toggleDeleteConfirmationModal}
        >
          <ModalHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>Confirm Deletion</div>
              <button
                type="button"
                className="btn-close"
                onClick={toggleDeleteConfirmationModal}
                style={{ color: "white" }}
              >
                &times;
              </button>
            </div>
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this renter?</ModalBody>
          <ModalFooter>
            <Button className="btn btn-gradient" onClick={handleDeleteRenter}>
              Confirm Delete
            </Button>
            <Button color="secondary" onClick={toggleDeleteConfirmationModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={thirdModalOpen} toggle={toggleThirdModal} size="lg">
          <ModalHeader toggle={toggleThirdModal}>Invoice </ModalHeader>
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
