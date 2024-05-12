import { Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { Lock, Phone } from "react-feather";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import NavbarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";

const LogIn = () => {
  const router = useRouter();
  const [showpassword, setShowpassword] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://backend.asholproperty.com/ownercustomer/login",
        {
          mobile_number: values.mobile_number,
          password: values.password,
        }
      );

      if (response.data.token === "Inactive") {
        toast.error("Your account has been restricted. Contact us,please .");
        return;
      }

      //console.log(response.data);
      const token = response.data?.token;
      // dispatch(setRole(role));
      if (token == "") {
        toast.error("Verify your number");
        router.push(`/otp/${values.mobile_number}`);
      } else {
        const { role, id } = response.data?.userProfile;
        const { token } = response.data;
        localStorage.setItem("token", token); // Save token to localStorage
        localStorage.setItem("id", id);
        localStorage.setItem("role", role);

        toast.success("Login successful");
        router.push("/home");
      }
    } catch (error) {
      toast.error("Please check your email and password..!");
    }
  };

  //const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("role")) {
      router.push("/home");
    }
  }, [router]);

  return (
    <div>
      <NavbarFive />
      <div
        className="authentication-box"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container fluid={true} className="container-fluid h-75">
          <Row className="log-in">
            <Col xxl="3" xl="4" lg="5" md="6" sm="8" className="form-login">
              <Card className="card">
                <CardBody className="card-body">
                  <div className="title-3 text-start">
                    <h2>Log in</h2>
                  </div>
                  <Formik
                    initialValues={{
                      mobile_number: "",
                      password: "",
                    }}
                    onSubmit={handleSubmit}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="form-group">
                          <div
                            className="input-group"
                            style={{ alignItems: "center" }}
                          >
                            <div className="input-group-prepend">
                              <Phone size={20} />
                            </div>
                            <Field
                              type="text"
                              className={`form-control ${
                                errors.mobile_number && touched.mobile_number
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="mobile_number"
                              placeholder="Enter mobile number"
                            />
                          </div>
                          {errors.mobile_number && touched.mobile_number && (
                            <div className="text-danger ms-4">
                              {errors.mobile_number}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <div
                            className="input-group"
                            style={{ alignItems: "center" }}
                          >
                            <div className="input-group-prepend">
                              <Lock size={20} />
                            </div>
                            <Field
                              type={`${showpassword ? "text" : "password"}`}
                              name="password"
                              id="pwd-input"
                              className={`form-control ${
                                errors.password && touched.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              placeholder="Password"
                            />
                            <div className="input-group-apend">
                              <i
                                id="pwd-icon"
                                className={`far fa-eye${
                                  !showpassword ? "-slash" : ""
                                }`}
                                onClick={() => {
                                  setShowpassword(!showpassword);
                                }}
                              />
                            </div>
                          </div>
                          {errors.password && touched.password && (
                            <div className="text-danger ms-4">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="d-flex">
                          {/* Remember me checkbox */}
                          {/* <label className="d-block mb-0" htmlFor="chk-ani">
                          <input className="checkbox_animated" id="chk-ani" type="checkbox" /> Remember me
                        </label> */}
                          <Link href="/forgot-password" className="font-rubik">
                            Forgot password?
                          </Link>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-gradient btn-pill me-sm-3 me-2"
                            style={{ width: "110px" }}
                          >
                            Log in
                          </button>
                          <Link
                            href="/signup"
                            className="btn btn-dashed btn-pill"
                          >
                            Create Account
                          </Link>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
            {/* <Col xxl="7" xl="7" lg="6" className="offset-xxl-1 auth-img">
            <Img src={`/assets/images/svg/2.jpg`} alt="" className="bg-img" />
          </Col> */}
          </Row>
        </Container>
      </div>
      <FooterThree />
    </div>
  );
};

export default LogIn;

LogIn.getLayout = function getLayout(LogIn) {
  return <>{LogIn}</>;
};
