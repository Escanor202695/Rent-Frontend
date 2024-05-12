import React, { useState, useEffect } from "react";
import { MapPin, PhoneCall, Mail } from "react-feather";

import * as Yup from "yup";
import { Button, Modal, ModalHeader, ModalBody, Row } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { isBefore, isAfter, setHours, setMinutes } from "date-fns";

const ContactInfo = ({ value, mobile }) => {
  const router = useRouter();
  const { id } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [profileDetail, setProfileDetail] = useState();
  const [userId, setUserId] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    // Check if localStorage is available in the browser environment
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setUserId(id);
      setRole(role);
      getProfile(id);
    }
  }, []);

  const getProfile = async (userId) => {
    axios
      .get(`https://backend.asholproperty.com/ownercustomers/${userId}`)
      .then((response) => {
        setProfileDetail(response.data);
        //console.log('profile data',response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is less than or equal to 768 (typical tablet breakpoint)
      setIsMobileOrTablet(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleModal = () => {
    if (userId === null) router.push("/login");
    else setShowModal((prevShowModal) => !prevShowModal);
  };

  console.log(value);

  const initialValues = {
    date: "",
    time: "",
  };

  const validationSchema = Yup.object().shape({
    date: Yup.string()
      .required("Date is required")
      .test("future-date", "Date must be in the future", (value) => {
        const selectedDate = new Date(value);
        const currentDate = new Date();
        return selectedDate > currentDate;
      }),
    time: Yup.string()
      .required("Time is required")
      .test("valid-time", "Time must be between 9am and 6pm", (value) => {
        const selectedTime = setMinutes(
          setHours(new Date(), parseInt(value?.split(":")[0], 10)),
          parseInt(value?.split(":")[1], 10)
        );
        const startTime = setHours(new Date(), 9);
        const endTime = setHours(new Date(), 18);

        if (
          isAfter(selectedTime, startTime) &&
          isBefore(selectedTime, endTime)
        ) {
          return true;
        }

        return false;
      }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(`https://backend.asholproperty.com/leads`, {
        ...values,
        fullName: profileDetail.fullName,
        mobileNo: profileDetail.mobile_number,
        status: "Pending",
        ownercustomerId: userId || "",
        propertyId: value.id || "",
      });

      toast.success("Thanks! We will contact you soon.");
      setSubmitting(false);
      toggleModal();
    } catch (error) {
      console.error("An error occurred during form submission:", error.message);
      toast.error("Something went wrong!");
      setSubmitting(false);
    }
  };
  return (
    <div className="advance-card">
      {!mobile && (
        <img
          src="/assets/images/contact.png"
          alt="logo"
          style={{ width: "75%", height: "auto", marginBottom: "3rem" }}
        />
      )}
      {!mobile && <h6>Contact Info</h6>}
      <div className="category-property">
        {!mobile && (
          <ul className="ps-2">
            <li>
              <MapPin className="me-2" />
              Address - 367 Gawair, Hassen Tower, Dakhshin Khan, Dhaka 1230
            </li>
            <li>
              <Mail className="me-2" />
              info@asholproperty.com
            </li>
            <li>
              <PhoneCall className="me-2" />
              09613825455
            </li>
          </ul>
        )}

        {role !== "owner" && (mobile ? isMobileOrTablet : true) && (
          <button
            className="btn btn-gradient mt-3"
            style={{ width: "150px", fontSize: "1.1rem" }}
            onClick={toggleModal}
          >
            Request Visit
          </button>
        )}
      </div>

      {/* Request Modal */}
      <Modal
        isOpen={showModal}
        toggle={toggleModal}
        centered
        style={{ width: "auto" }}
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
            <button
              type="button"
              className="btn-close"
              onClick={toggleModal}
              style={{ color: "white" }}
            >
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
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default ContactInfo;
