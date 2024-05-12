import React, { useEffect, useState } from "react";
import {
  Lock,
  Mail,
  User,
  Calendar,
  CreditCard,
  Image,
  Phone,
  Home,
  UserCheck,
  MapPin,
} from "react-feather";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";

const divisionsBangladesh = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

function OwnerForm({ state, setState, handleSubmit, CheckAge }) {
  const [showPassword, setShowPassword] = useState(false);
  const [runners, setRunners] = useState([]);
  const handleAgreeChange = (e, setFieldValue) => {
    setFieldValue("agreeToTerms", e.target.checked);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  useEffect(() => {
    getRunner();
  }, []);

  const getRunner = async () => {
    try {
      const response = await axios.get(
        "https://backend.asholproperty.com/employees",
        {
          params: {
            filter: {
              where: {
                role: "runner",
              },
            },
          },
        }
      );
      // console.log(response.data);
      const runners = response.data.map((runner) => ({
        id: runner.id,
      }));
      setRunners(runners);
    } catch (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
  };
  const validateRunnerId = (value) => {
    console.log(value, runners);
    if (!runners.find((runner) => runner.id === value)) {
      return false;
    }

    return true;
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        role: "owner",
        date_of_birth: "",
        nidNumber: "",
        gender: "",
        mobile_number: "",
        membershipType: "",
        runnerId: "",
        nidPhoto: null,
        signPhoto: null,
        profilePhoto: null,
        areaId: "",
        subAreaId: "lalbagh",
        division: "dhaka",
        roadNo: "",
        houseNo: "",
        local_address: "",
        agreeToTerms: false,
        latLong: "",
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password is too short - should be 8 chars minimum"),
        role: Yup.string().required("Role is required"),
        date_of_birth: Yup.date()
          .required("Date of Birth is required")
          .nullable()
          .test(
            "is-at-least-18",
            "You must be at least 18 years old",
            CheckAge
          ),
        nidNumber: Yup.string().required("NID Number is required"),
        mobile_number: Yup.string()
          .required("Mobile Number is required")
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(11, "Must be exactly 11 digits")
          .max(11, "Must be exactly 11 digits"),
        membershipType: Yup.string().required("Membership Type is required"),
        gender: Yup.string().required("Gender is required...!"),
        runnerId: Yup.string()
          .required("Runner ID is required")
          .test("is-valid-runner-id", "Invalid runner ID", validateRunnerId),
        nidPhoto: Yup.mixed().required("NID Photo is required"),
        signPhoto: Yup.mixed().required("Signature Photo is required"),
        profilePhoto: Yup.mixed().required("Profile Photo is required"),
        areaId: Yup.string().required("Area is required"),
        subAreaId: Yup.string().required("Subarea is required"),
        division: Yup.string().required("Division is required"),
        roadNo: Yup.string().required("Road number is required"),
        houseNo: Yup.string().required("House number is required"),
        latLong: Yup.string().required("Latitude & Longitude is required"),
        local_address: Yup.string().required("Local address is required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="flex-grow-1">
          {/* Full Name */}
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <User size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="text"
                name="fullName"
                placeholder="Enter your name"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="fullName"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <Calendar size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="date"
                name="date_of_birth"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="date_of_birth"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <Mail size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email address"
                style={{ borderRadius: "4px" }}
              />
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          {/* NID Number */}
          <div className="form-group">
            <div className="input-group">
              <div
                className="input-group-prepend"
                style={{ marginRight: "2px" }}
              >
                <CreditCard size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="text"
                name="nidNumber"
                placeholder="Enter NID Number"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="nidNumber"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <div className="input-group">
              <div
                className="input-group-prepend"
                style={{ marginRight: "2px" }}
              >
                <Phone size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="text"
                name="mobile_number"
                placeholder="Enter Mobile Number"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="mobile_number"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          <div className="row my-3">
            <div className="col-lg-6">
              <div className="input-group">
                <User size={20} style={{ marginRight: "8px" }} />

                <Field
                  id="gender"
                  as="select"
                  name="gender"
                  className="form-control"
                  style={{ borderRadius: "4px" }}
                >
                  <option value="" selected>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-danger"
                style={{ marginLeft: "28px" }}
              />
            </div>

            {/* Membership Type */}
            <div className="col-lg-6 margin-sm">
              <div className="input-group">
                {/* Membership Icon */}
                <UserCheck size={20} style={{ marginRight: "8px" }} />{" "}
                {/* Membership Dropdown */}
                <Field
                  as="select"
                  name="membershipType"
                  className="form-control"
                  placeholder="Select Membership"
                  style={{ borderRadius: "4px" }}
                >
                  <option value="" selected>
                    Membership type
                  </option>
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                  <option value="grand_premium">Grand Premium</option>
                </Field>
              </div>
              {/* Display error message below the input field */}
              <ErrorMessage
                name="membershipType"
                component="div"
                className="text-danger"
                style={{ marginLeft: "28px" }}
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="form-group">
            <div className="input-group flex-column">
              <div className="input-group-prepend mb-2 me-2">
                <Image size={20} style={{ marginRight: "8px" }} />
                Upload Profile picture
              </div>
              <div>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  name="profilePhoto"
                  onChange={(event) => {
                    const selectedImage = event.currentTarget.files[0];
                    setState((prevState) => ({
                      ...prevState,
                      selectedImage: URL.createObjectURL(selectedImage),
                    }));
                    setFieldValue("profilePhoto", selectedImage);
                  }}
                  className="form-control"
                  style={{ borderRadius: "4px" }}
                />
              </div>
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="profilePhoto"
              component="div"
              className="text-danger"
            />
            {state.selectedImage && (
              <img
                src={state.selectedImage}
                alt="Selected"
                style={{ width: "30px", height: "auto", marginTop: "5px" }}
              />
            )}
          </div>

          <div className="form-group">
            <div className="input-group flex-column">
              <div className="input-group-prepend mb-2 me-2">
                <CreditCard size={20} style={{ marginRight: "8px" }} />
                Upload NID Photo(pdf)
              </div>
              <div>
                <input
                  type="file"
                  id="nidPhotoUpload"
                  accept="application/pdf"
                  name="nidPhoto"
                  onChange={(event) => {
                    const selectedFile = event.currentTarget.files[0];
                    setState((prevState) => ({
                      ...prevState,
                      selectedNidFile: selectedFile,
                    }));
                    setFieldValue("nidPhoto", selectedFile);
                  }}
                  className="form-control"
                  style={{ borderRadius: "4px" }}
                />
              </div>
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="nidPhoto"
              component="div"
              className="text-danger"
            />
          </div>

          {/* Signature */}
          <div className="form-group">
            <div className="input-group flex-column">
              <div className="input-group-prepend mb-2 me-2">
                <Image size={20} style={{ marginRight: "8px" }} />
                Upload Agreement
              </div>
              <div>
                <input
                  type="file"
                  accept="application/pdf"
                  name="signPhoto"
                  onChange={(event) => {
                    const selectedImage = event.currentTarget.files[0];
                    setState((prevState) => ({
                      ...prevState,
                      selectedSignImage: selectedImage,
                    }));
                    setFieldValue("signPhoto", selectedImage);
                  }}
                  className="form-control"
                  style={{ borderRadius: "4px" }}
                />
              </div>
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="signPhoto"
              component="div"
              className="text-danger"
            />
          </div>

          {/* Runner ID Dropdown */}
          {/* Runner ID Input */}
          <div className="form-group">
            <div className="input-group">
              <div
                className="input-group-prepend"
                style={{ marginRight: "2px" }}
              >
                <User size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="text"
                name="runnerId"
                placeholder="Enter Runner ID"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
            </div>
            <ErrorMessage
              name="runnerId"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          {/* Division */}
          <div className="form-group">
            <div className="input-group">
              <div
                className="input-group-prepend"
                style={{ marginRight: "2px" }}
              >
                <Home size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                as="select"
                name="division"
                placeholder="Enter your division"
                className="form-control"
                style={{ borderRadius: "4px" }}
              >
                <option value="dhaka" selected>
                  Dhaka
                </option>
              </Field>
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="division"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          {/* Second row */}
          <div className="row mb-3">
            {/* Area */}
            <div className="col-lg-6">
              <div className="input-group">
                <div className="input-group-prepend">
                  <MapPin size={20} style={{ marginRight: "8px" }} />
                </div>
                <Field
                  as="select"
                  name="areaId"
                  className="form-control"
                  placeholder="Select Area"
                  style={{ borderRadius: "4px" }}
                  onChange={(event) => {
                    setState((prevState) => ({
                      ...prevState,
                      areaId: event.target.value,
                    }));
                    setFieldValue("areaId", event.target.value);
                  }}
                >
                  <option value="" selected>
                    Select area
                  </option>
                  {/* Add options based on your data */}
                  {state.areaArray.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.AreaName}
                    </option>
                  ))}
                </Field>
              </div>
              {/* Display error message below the input field */}
              <ErrorMessage
                name="areaId"
                component="div"
                className="text-danger"
                style={{ marginLeft: "28px" }}
              />
            </div>

            {/* Subarea */}
            <div className="col-lg-6 margin-sm">
              <div className="input-group">
                <div className="input-group-prepend">
                  <MapPin size={20} style={{ marginRight: "8px" }} />
                </div>
                <Field
                  as="select"
                  name="subAreaId"
                  className="form-control"
                  placeholder="Select Subarea"
                  style={{ borderRadius: "4px" }}
                  disabled={!state.subareaArray}
                >
                  <option value="" selected>
                    {!state.subareaArray ? "No subarea" : "Select subarea"}
                  </option>
                  {state.subareaArray &&
                    state.subareaArray.map((subArea) => (
                      <option key={subArea.id} value={subArea.id}>
                        {subArea.subAreaName}
                      </option>
                    ))}
                </Field>
              </div>
              {/* Display error message below the input field */}
              <ErrorMessage
                name="subAreaId"
                component="div"
                className="text-danger"
                style={{ marginLeft: "28px" }}
              />
            </div>
          </div>

          {/* Third row */}
          <div className="row mb-3">
            {/* Road No */}
            <div className="col-lg-6">
              <div className="input-group">
                <div className="input-group-prepend">
                  <Home size={20} style={{ marginRight: "8px" }} />
                </div>
                <Field
                  type="text"
                  name="roadNo"
                  placeholder="Enter your road number"
                  className="form-control"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              {/* Display error message below the input field */}
              <ErrorMessage
                name="roadNo"
                component="div"
                className="text-danger"
                style={{ marginLeft: "28px" }}
              />
            </div>

            {/* House No */}
            <div className="col-lg-6 margin-sm">
              <div className="input-group">
                <div className="input-group-prepend">
                  <Home size={20} style={{ marginRight: "8px" }} />
                </div>
                <Field
                  type="text"
                  name="houseNo"
                  placeholder="Enter your house number"
                  className="form-control"
                  style={{ borderRadius: "4px" }}
                />
              </div>
              {/* Display error message below the input field */}
              <ErrorMessage
                name="houseNo"
                component="div"
                className="text-danger"
                style={{ marginLeft: "28px" }}
              />
            </div>
          </div>

          {/* Local Address */}
          <div className="form-group">
            <div className="input-group">
              <div
                className="input-group-prepend"
                style={{ marginRight: "2px" }}
              >
                <Home size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="text"
                name="local_address"
                placeholder="Enter your local address"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="local_address"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          <div className="form-group">
            <div className="input-group">
              <div
                className="input-group-prepend"
                style={{ marginRight: "2px" }}
              >
                <MapPin size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="text"
                name="latLong"
                placeholder="Enter Latitude & Longitude"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
            </div>
            {/* Display error message below the input field */}
            <ErrorMessage
              name="latLong"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <Lock size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                placeholder="Enter Password"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
              <div className="input-group-append">
                <i
                  id="pwd-icon"
                  className={`far fa-eye${!showPassword ? "-slash" : ""} ms-2`}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              </div>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          <div className="form-group">
            <div className="input-group">
              <div
                className="input-group-prepend"
                style={{ marginRight: "2px" }}
              >
                <Lock size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="password"
                name="confirm_password"
                className="form-control"
                placeholder="Confirm your password"
                style={{ borderRadius: "4px" }}
                onChange={(e) => {
                  setFieldValue("confirmPassword", e.target.value);
                  setState({ ...state, confirmPassword: e.target.value });
                }}
              />
              {/* Display error message below the input field */}
            </div>
            <ErrorMessage
              name="confirm_password"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          <div className="form-group form-check">
            <Field
              type="checkbox"
              name="agreeToTerms"
              className="form-check-input"
              id="agreeToTerms"
              checked={values.agreeToTerms}
              onChange={(e) => handleAgreeChange(e, setFieldValue)}
            />
            <label className="form-check-label" htmlFor="agreeToTerms">
              I agree to the Terms & Conditions.{" "}
              <span>
                <Link href="/terms-conditions" target="_blank">
                  View
                </Link>
              </span>
            </label>
            {/* Display error message below the checkbox */}
            <ErrorMessage
              name="agreeToTerms"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              type="submit"
              className="btn btn-gradient"
              disabled={isSubmitting || !values.agreeToTerms} // Disable if not agreed to terms
              onClick={() => {
                if (!values.agreeToTerms) {
                  notifyError("Please agree to the Terms & Conditions");
                }
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default OwnerForm;
