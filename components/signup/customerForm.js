import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Lock,
  Mail,
  User,
  Calendar,
  CreditCard,
  Image,
  Phone,
  Home,
  Briefcase,
} from "react-feather";
import Link from "next/link";

function CustomerForm({ state, setState, handleSubmit, CheckAge }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleAgreeChange = (e, setFieldValue) => {
    setFieldValue("agreeToTerms", e.target.checked);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        date_of_birth: "",
        nidNumber: "",
        gender: "",
        mobile_number: "",
        nidPhoto: null,
        profilePhoto: null,
        profession: "",
        local_address: "",
        agreeToTerms: false,
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string().required("Name is Required..!"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string().required("Password is required..!"),
        date_of_birth: Yup.date()
          .required("Date of Birth is required")
          .nullable()
          .test(
            "is-at-least-18",
            "You must be at least 18 years old",
            CheckAge
          ),
        nidNumber: Yup.string().required("NID is required..!"),
        gender: Yup.string().required("Gender is required...!"),
        nidPhoto: Yup.mixed().required("NID Photo is required"),
        profilePhoto: Yup.mixed().required("Profile Photo is required"),
        mobile_number: Yup.string()
          .matches(/^[0-9]+$/, "Mobile number must be a number")
          .required("Mobile number is required")
          .min(11, "Must be exactly 11 digits")
          .max(11, "Must be exactly 11 digits"),
        profession: Yup.string().required("Profession is required..!"),
        local_address: Yup.string().required("Local Address is required...!"),
      })}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="flex-grow-1">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <User size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="text"
                name="fullName"
                placeholder="Enter your fullName"
                className="form-control"
              />
            </div>
            <ErrorMessage
              name="fullName"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>
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
            <ErrorMessage
              name="email"
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
            <ErrorMessage
              name="nidNumber"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>

          <div className="form-group">
            <div className="input-group flex-column">
              <div className="input-group-prepend mb-2 me-2">
                <CreditCard size={20} style={{ marginRight: "8px" }} />
                Upload NID pdf
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

            <ErrorMessage
              name="nidPhoto"
              component="div"
              className="text-danger"
            />
          </div>

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
            <ErrorMessage
              name="mobile_number"
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
                <User size={20} style={{ marginRight: "8px" }} />
              </div>
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
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <Home size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="text"
                name="local_address"
                placeholder="Enter your Full Address"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
            </div>
            <ErrorMessage
              name="local_address"
              component="div"
              className="text-danger"
              style={{ marginLeft: "28px" }}
            />
          </div>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <Briefcase size={20} style={{ marginRight: "8px" }} />
              </div>
              <Field
                type="text"
                name="profession"
                placeholder="Enter your profession"
                className="form-control"
                style={{ borderRadius: "4px" }}
              />
            </div>
            <ErrorMessage
              name="profession"
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
                id="pwd-input"
                placeholder="Password"
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
              style={{ marginLeft: "28px" }}
              className="text-danger"
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
                name="confirmPassword"
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

export default CustomerForm;
