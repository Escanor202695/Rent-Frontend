import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const Renters = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rentersData, setRentersData] = useState([]);
  const toggleModal = () => setModalOpen(!modalOpen);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState({});
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const initialValues = { renterId: "", propertyId: "", assetId: "", deed: "" };

  const validationSchema = Yup.object().shape({
    renterId: Yup.string().required("Renter ID is required"),
    propertyId: Yup.string().required("Property ID is required"),
    assetId: Yup.string().required("Asset ID is required"),
  });

  useEffect(() => {
    fetchRentersData();
    fetchAssets();
  }, []);


  useEffect(() => {
    fetchProperties();
  }, [selectedAsset]);

  const handleAssetSelect = async (selectedAssetId) => {
    const selectedAsset = assets.find((asset) => asset.id === selectedAssetId);
    setSelectedAsset(selectedAsset);
  };

  // Function to fetch property options based on the selected asset
  const fetchProperties = async () => {
    console.log(selectedAsset);
    try {
      const response = await axios.get(
        "https://backend.asholproperty.com/assets-properties",
        {
          params: {
            filter: {
              where: {
                userAssetsId: selectedAsset.id,
                status: "Vacant",
              },
            },
          },
        }
      );
      console.log(response.data);
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
      //console.log("fetch assets", response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const handleVacantProperty = async (propertyId) => {
    try {
      const response = await axios.patch(
        `https://backend.asholproperty.com/assets-properties/${propertyId}`,
        {
          status: "Occupied",
        }
      );

      await axios.patch(
        `https://backend.asholproperty.com/property-items/${propertyId}`,
        {
          status: "Occupied",
        }
      );
      //console.log(response.data);
    } catch (error) {
      console.error("Error fetching property options:", error);
    }
  };

  const fetchRentersData = async () => {
    try {
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

      const updatedRentersData = await Promise.all(
        response.data.map(async (renter) => {
          const propertyResponse = await axios.get(
            `https://backend.asholproperty.com/assets-properties/${renter.assetsPropertyId}`
          );
          return {
            ...renter,
            property: propertyResponse.data, // Update property with new data
          };
        })
      );

      setRentersData(updatedRentersData);
    } catch (error) {
      console.error("Error fetching renters data:", error);
    }
  };

  const handleAddRenter = async (values, { resetForm }) => {
    try {
      const id = localStorage.getItem("id");

      const formData = new FormData();
      formData?.append("file", selectedFile);

      const deedsUrl = await axios.post(
        "https://backend.asholproperty.com/buckets/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const response = await axios.post(
        "https://backend.asholproperty.com/renters",
        {
          customerId: values.renterId,
          assetsPropertyId: values.propertyId,
          status: "Active",
          ownerId: id,
          deedsUrl: deedsUrl.data?.fileName || "Unavailable",
        }
      );
      await axios.post(
        "https://backend.asholproperty.com/close-deals",
        {
          renterId: values.renterId,
          propertyId: values.propertyId,
          status: "Live",
          ownerId: id,
          deedsUrl: deedsUrl.data?.fileName || "Unavailable",
          ownersMobileNo:"string",
          customersMobileNo:"string",
        }
      );
      handleVacantProperty(values.propertyId);
      resetForm();
      toggleModal();
    } catch (error) {
      console.error("Error adding renter:", error);
      toast.error(error.response.data.error.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button className="btn btn-gradient mb-4" onClick={toggleModal}>
        Add Renter
      </Button>

      {rentersData.length === 0 && <div>No Renter Available!</div>}

      {rentersData.length !== 0 && (
        <div style={{ maxWidth: "100%", overflow: "scroll" }}>
          <Table
            bordered={true}
            borderless={false}
            className="table-bordered text-center"
          >
            <thead>
              <tr>
                <th>Sl</th>
                <th>Renter ID</th>
                <th>Renter Name</th>
                <th>Photo</th>
                <th>Property Id</th>
                <th>Property Title</th>
                <th>Manage Renter</th>
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
                  <td>{renter.assetsPropertyId}</td>
                  <td>{renter.property?.title}</td>
                  <td>
                    <Link
                      href={`/renters/${renter.customerId}`}
                      className="link"
                    >
                      <Button color="primary">Manage {">"}</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader className="modal-header">
          <p className="modal-title">Add Renter</p>
          <Button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" onClick={toggleModal}>
              &times;
            </span>
          </Button>
        </ModalHeader>
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
                    disabled={!selectedAsset}
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

                <FormGroup>
                  <Label for="deed">Upload Deed</Label>
                  <input
                    type="file"
                    id="deed"
                    accept="application/pdf"
                    name="deed"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  <ErrorMessage
                    name="deed"
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
    </div>
  );
};

export default Renters;
