import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavbarFive from "../layout/headers/NavbarFive";
import { toast } from "react-toastify";
import ProfileView from "../components/profile/profileView";
import { useRouter } from "next/router";
import { getPageFiles } from "next/dist/server/get-page-files";
import FooterThree from "../layout/footers/FooterThree";

const MyProfileTab = () => {
  const [profileDetail, setProfileDetail] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState();
  const router = useRouter();
  const [id, setId] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");

      getprofile(id);

      setId(id);
      setRole(role);

      // //console.log(id,role);
      if (!id) router.push("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
    local_address: Yup.string().required("Address is required"),
    profilePhotoURL: Yup.mixed().required("Profile Photo is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const initialValues = {
    fullName: profileDetail.fullName || "",
    email: profileDetail.email || "",
    date_of_birth: profileDetail.date_of_birth || "",

    local_address: profileDetail.local_address || "",
    profilePhotoURL: profileDetail.profilePhotoURL,
  };

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("file", values.profilePhotoURL);
      const profilePhotoResponse = await axios.post(
        "https://backend.asholproperty.com/buckets/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log("haha", profilePhotoResponse);
      const profilePhotoFileName = profilePhotoResponse.data?.fileName || "";

      const updatedValues = {
        ...values,
        profilePhotoURL: profilePhotoFileName,
      };

      const res = await axios.patch(
        `https://backend.asholproperty.com/ownercustomers/${id}`,
        updatedValues
      );

      toast.success("Profile Updated Successfully");
      window.location.reload();
      getprofile();
      setModalOpen(false);
    } catch (error) {
      console.error(
        "An error occurred while updating the profile/password:",
        error.message
      );
    }
  };

  const getprofile = async (userId) => {
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

  return (
    <>
      <NavbarFive />
      {id && (
        <div
          className="dashboard-content"
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
          }}
        >
          <ProfileView
            role={role}
            profileDetail={profileDetail}
            setModalOpen={setModalOpen}
            public_view="false"
          />
        </div>
      )}
      <Modal isOpen={modalOpen} toggleModal={() => setModalOpen(false)}>
        <ModalHeader
          toggleModal={() => setModalOpen(false)}
          close={
            <button className="btn-close" onClick={() => setModalOpen(false)}>
              &times;
            </button>
          }
        >
          Edit Profile
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
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
                  <label>Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label>Date of Birth</label>
                  <Field
                    type="date"
                    name="date_of_birth"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="date_of_birth"
                    component="div"
                    className="error text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label>Address</label>
                  <Field
                    as="textarea"
                    name="local_address"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="local_address"
                    component="div"
                    className="error text-danger"
                  />
                </div>

                {/* Profile Picture */}
                <div className="form-group">
                  <div className="input-group flex-column">
                    <div className="input-group-prepend mb-2 me-2">
                      Profile picture
                    </div>
                    <div>
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        name="profilePhotoURL"
                        className="form-control"
                        style={{ borderRadius: "4px" }}
                        onChange={(event) =>
                          setFieldValue(
                            "profilePhotoURL",
                            event.currentTarget.files[0]
                          )
                        }
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="profilePhotoURL"
                    component="div"
                    className="text-danger"
                  />
                  <img
                    src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${profileDetail.profilePhotoURL}`}
                    alt="Selected"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginTop: "5px",
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-gradient mt-3">
                  Save Changes
                </button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>

      {/*this modal is not being used, may be later*/}
      <Modal isOpen={otpModalOpen} toggleModal={() => setOtpModalOpen(false)}>
        <ModalHeader
          close={
            <button
              className="btn-close"
              style={{ fontSize: "20px " }}
              onClick={() => setOtpModalOpen(false)}
            >
              &times;
            </button>
          }
        >
          Update Password
        </ModalHeader>
      </Modal>
      <FooterThree />
    </>
  );
};

export default MyProfileTab;
