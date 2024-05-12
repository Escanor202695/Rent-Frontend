import React from "react";
import Typed from "typed.js";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { ButtonToolbar } from "rsuite";
import axios from "axios";
import { Calendar } from "react-feather";
import WhatAreYouLookingFor from "../../elements/WhatAreYouLookingFor";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button,
  Col,
  Container,
  Row,
} from "reactstrap";

import {
  VideoDetail,
  WantToBuyOrRentHome,
} from "../../../constValues/constValues";
import Link from "next/link";

const HomeBannerSection = () => {
  const el = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [latLong, setLatLong] = useState("");

  const handleOptionChange = (event) => setSelectedOption(event.target.value);

  const handleRequestListing = async () => {
    try {
      const requestData = {
        date: date, // Replace with your date value
        timeFrame: timeFrame, // Replace with your timeframe value
        latLong: latLong,
        ownercustomerId: ownerCustomerId,
        assetsPropertyId: pId,
        userAssetsId: id,
        areaId: area,
        subareaId: subArea,
      };
      //console.log(requestData);
      await axios.post(
        "https://backend.asholproperty.com/request-listings",
        requestData
      );
      await axios.patch(
        `https://backend.asholproperty.com/assets-properties/${pId}`,
        {
          status: "Requested",
        }
      );
      setShowModal(false);
      // window.location.reload(); // Refresh the window after form submission
      // alert("Patch Result:", patchResponse.data);
      // Handle success or show a message to the user
    } catch (error) {
      console.error("Error requesting listing:", error);
    }
  };

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["tions Beyond Square Feet"],
      stringsElement: null,
      typeSpeed: 120,
      backSpeed: 30,
      showCursor: false,
      loop: true,
      cursorChar: "|",
      attr: null,
      contentType: "html",
      callback: function () {},
      preStringTyped: function () {},
      onStringTyped: function () {},
      resetCallback: function () {},
    });
    // Destroying
    return () => {
      typed.destroy();
    };
  }, []);

  const customStyles = {
    content: {
      width: "500px",
      height: "300px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const handleSubmit = async (values) => {
    // Handle form submission here
    try {
      const response = await axios.post(
        "https://backend.asholproperty.com/request-listings",
        {
          date: values.date,
          timeFrame: values.timeFrame,
          status: "pending",
        }
      );
      //console.log(response.data);
    } catch (error) {
      //console.log(error);
      //toast.error("Please check your email and password..!");
    }
  };

  return (
    <section
      className="home-section layout-5"
      style={{ backgroundImage: "url('/assets/images/owner-bg.png')" }}
    >
      <Container fluid={true}>
        <Row>
          <Col xl="8" md="11">
            <div className="home-main">
              <div className="home-content">
                <div>
                  <div>
                    <img
                      // src="/assets/images/signature/2.png"
                      className="img-fluid m-0"
                      alt=""
                    />
                    <h6>{WantToBuyOrRentHome}</h6>
                    <h1>
                      Solu<span ref={el}></span>
                    </h1>
                    <Row>
                      <Col xl="8">
                        <p>
                          we take pride in providing exceptional rental
                          management and property buy-sell services for both
                          property owners and tenants. Our mission is to make
                          the process of finding a perfect rental home or
                          getting tenants for your property hassle-free.
                        </p>
                      </Col>
                    </Row>
                    <ButtonToolbar>
                      <Link href="/assets" className="nav-link">
                        <Button
                          style={{ color: "white" }}
                          className="btn btn-gradient btn-pill me-sm-3 me-2"
                        >
                          Request Property Listing
                        </Button>
                      </Link>
                    </ButtonToolbar>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <div className="decor-image">
        <img src="/assets/images/shape.png" alt="" className="img-fluid" />
      </div> */}
    </section>
  );
};

export default HomeBannerSection;
