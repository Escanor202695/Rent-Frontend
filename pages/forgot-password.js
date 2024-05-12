import React, { useState } from "react";
import { Container, Navbar } from "reactstrap";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { User } from "react-feather";
import NavbarFive from "../layout/headers/NavbarFive";
import { Router, useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import FooterThree from "../layout/footers/FooterThree";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //console.log('clicked');
      router.push("/forgot-password-otp/" + phone);

      const response = await axios.post(
        "https://backend.asholproperty.com/ownercustomer/forgetpassword",
        { mobile_number: phone }
      );

      toast.success("An OTP has been sent to your mobile");
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <>
      <NavbarFive />
      <section className="login-wrap">
        <Container>
          <div
            className="row log-in"
            style={{
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
              <div className="theme-card">
                <div className="title-3 text-start">
                  <h2>Forgot your password</h2>
                </div>
                <form>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <User />
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Phone Number"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-gradient btn-pill me-sm-3 me-2"
                      onClick={handleSubmit}
                    >
                      Send request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <FooterThree />
    </>
  );
};

export default ForgotPassword;
