import Link from "next/link";
import React from "react";
import { Col } from "reactstrap";
import { Logo2 } from "../../../components/elements/Logo";

const FooterContactUsDetails = () => {
  return (
    <Col xl="3">
      <div className="footer-details text-center">
        <img
          src="/assets/images/logo-white.png"
          alt=""
          className="img-fluid for-light p-2"
          style={{maxWidth:"300px"}}
        />
        <p>
          Your Trusted Partner in Rental Management and Real Estate Solutions!
        </p>
      </div>
    </Col>
  );
};

export default FooterContactUsDetails;
