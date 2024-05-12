import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BodyContent from "../../components/property/tabPanelPages";
import SliderSection from "../../components/property/tabPanelPages/Slider";

import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, Row } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import FooterThree from "../../layout/footers/FooterThree";
import NavbarFive from "../../layout/headers/NavbarFive";
import axios from "axios";
import { toast } from "react-toastify";

const PropertyDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState({});
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const initialValues = {
    fullName: "",
    mobileNo: "",
    date: "",
    time: "",
    status: "Pending",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    mobileNo: Yup.string().required("mobileNo number is required"),
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
  });

  useEffect(() => {
    //console.log(showModal);
  }, [showModal]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      //console.log(values);

      const res = await axios.post(`https://backend.asholproperty.com/leads`, {
        ...values,
        status: "Pending",
        ownercustomerId: value.ownercustomerId || "",
        propertyId: value.id || "",
      });
      toast.success("Request Successful! We will contact you soon.");
      setSubmitting(false);
      toggleModal();
    } catch (error) {
      // Handle the error here, such as displaying an error message to the user
      console.error("An error occurred during form submission:", error.message);
      toast.error("Something went wrong!");
      setSubmitting(false); // Set submitting to false to allow resubmission
    }
  };

  const fetchData = async (id) => {
    try {
      //console.log(id);
      if (id) {
        const res = await axios.get(
          `https://backend.asholproperty.com/property-items/${id}`
        );
        setValue(res.data);
      }
    } catch (error) {
      //console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <>
      <NavbarFive />
      <BodyContent singleData={value} toggleModal={toggleModal} />
      <FooterThree />
      {/* Request Modal */}
      <Modal
        isOpen={showModal}
        toggle={toggleModal}
        centered
        style={{ width: "400px" }}
      >
        <ModalHeader>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Request Visit</div>
            <button type="button" className="btn-close" onClick={toggleModal}>
              &times;
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Full Name</label>
                  <Field type="text" name="fullName" className="form-control" />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="error text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label>Mobile Number</label>
                  <Field type="text" name="mobileNo" className="form-control" />
                  <ErrorMessage
                    name="mobileNo"
                    component="div"
                    className="error text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label>Date</label>
                  <Field type="date" name="date" className="form-control" />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="error text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label>Time</label>
                  <Field type="time" name="time" className="form-control" />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="error text-danger"
                  />
                </div>

                <Button
                  type="submit"
                  className="btn btn-gradient"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PropertyDetails;
