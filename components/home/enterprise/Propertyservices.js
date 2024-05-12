/**
 * It takes in an array of objects and returns a section with a title and a row of columns with the
 * data from the array
 * @returns A section with a container, row, and col.
 */
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Discover, PropertyServices } from "../../../constValues/constValues";
import { Calendar, Home, MoreVertical } from "react-feather";

const PropertyServicesSection = () => {
  const value = [
    {
      title: "Rental Management Services.",
      description:
        "The Rental Management System is an innovative and comprehensive software solution designed to streamline and optimize rental property operations. Whether you are a property owner, property manager, or a real estate agency, this system provides a centralized platform to manage and track all aspects of rental properties efficiently.",
      img: <Calendar size={24} />,
    },
    {
      title: "Buy and Sell Service.",
      description:
        "The Buy and Sell service is a cutting-edge online platform that connects buyers and sellers, providing a seamless and secure marketplace for various products and services. Whether you are an individual looking to sell pre-loved items or a business seeking new customers, our platform offers a user-friendly interface that simplifies the buying and selling process.",
      img: <Home size={24} />,
    },
    {
      title: "More coming soon, stay tuned!",
      description:
        "We are thrilled to announce that our platform is continuously evolving to bring you an even better user experience. Get ready to be amazed as we unveil these upcoming features that will make your time with us even more enjoyable and productive.",
      img: <MoreVertical size={24} />,
    },
  ];
  
  return (
    <section className="service-section service-1">
      <Container>
        <Row>
          <Col>
            <div className="title-2" style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
              <h2>{PropertyServices}</h2>
              <p style={{maxWidth:"800px"}}>At Ashol Property LTD, we offer a range of exceptional services designed to cater to the needs of both property owners and tenants. Our commitment to excellence and customer satisfaction sets us apart in the industry. Explore our services below:
              </p>
            </div>
            <Row className=" property-service column-space" >
              {value?.map((data, i) => (
                <Col xl="4" md="6" className=" wow fadeInUp" key={i}>
                  <div className="service-box" style={{height:"450px"}}>
                    <div className="icon-round">{data?.img}</div>
                    <h3>

                        {data?.title}
               
                    </h3>
                    <p style={{fontSize:"14px",textAlign:"justify"}}>{data?.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PropertyServicesSection;
