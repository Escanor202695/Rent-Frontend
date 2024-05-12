import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import NavbarFive from "../../layout/headers/NavbarFive";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "rsuite";
import FooterThree from "../../layout/footers/FooterThree";

function OtpVerification(props) {
  const router = useRouter();
  const phone = router.query.id;
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(false);

  const intervalRef = useRef(null); // To store the interval ID

  useEffect(() => {
    if (resendDisabled && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(intervalRef.current);
      setResendDisabled(false);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [resendDisabled, timer]);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "https://backend.asholproperty.com/ownercustomer/otpverification",
        {
          mobile_number: phone,
          otp: values.otp,
        }
      );

      toast.success("OTP verified successfully!");

      router.push(
        `/update-password?phone=${phone}&token=${response.data.token}`
      );
    } catch (error) {
      // Handle the error, for example using react-toastify
      toast.error(error);
      actions.setSubmitting(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();

    try {
      //console.log('clicked');
      router.push("/forgot-password-otp/" + phone);

      const response = await axios.post(
        "https://backend.asholproperty.com/ownercustomer/forgetpassword",
        { mobile_number: phone }
      );

      toast.success("OTP has been resent!");
      setResendDisabled(true);
      setTimer(60);
    } catch (error) {
      console.error("An error occurred:", error.message);
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
                </FormGroup>
                <div className="d-flex justify-content-between">
                  <Button
                    color="primary"
                    onClick={handleResend}
                    disabled={resendDisabled}
                  >
                    {resendDisabled ? `wait ${timer}s` : "Resend"}
                  </Button>
                  <Button
                    type="submit"
                    className="btn btn-gradient"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
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
