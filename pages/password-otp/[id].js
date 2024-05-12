import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import NavbarFive from "../../layout/headers/NavbarFive";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterThree from "../../layout/footers/FooterThree";

function OtpVerification(props) {
  const router = useRouter();
  const phone = router.query.id;

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "https://backend.asholproperty.com/ownercustomer/otpverification",
        {
          phone: phone,
          otp: values.otp,
        }
      );

      toast.success("OTP verified successfully!");
      router.push("/login");
    } catch (error) {
      // Handle the error, for example using react-toastify
      toast.error(error);
      actions.setSubmitting(false);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <NavbarFive />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80%" }}
      >
        <div className="col-sm-8 col-lg-3">
          <h2>OTP Verification</h2>
          <Formik
            initialValues={{
              otp: "",
            }}
            validationSchema={Yup.object({
              otp: Yup.string()
                .required("OTP is required")
                .length(6, "OTP should be 6 digits long"),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormGroup>
                  <Field
                    name="otp"
                    as={Input}
                    type="text"
                    id="otp"
                    placeholder="Enter your OTP"
                  />
                  <FormFeedback>
                    <ErrorMessage name="otp" />
                  </FormFeedback>
                  <small className="form-text text-muted">
                    OTP has been sent to your mobile number.
                  </small>
                </FormGroup>
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
        </div>
      </div>
      <FooterThree />
    </div>
  );
}

export default OtpVerification;
