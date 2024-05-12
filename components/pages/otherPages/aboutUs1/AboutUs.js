import React from "react";
import { Container, Row, Col } from "reactstrap";
import Img from "../../../../utils/BackgroundImageRatio";

const AboutUsSection = () => {
  return (
    <section className="about-main ratio_36">
      <Container>
        <Row>
          <div className="col">
            <Container>
              <Row style={{maxWidth:"1200px"}}>
                <Col lg="6" style={{display:"flex",justifyContent:"right",margin:"10px 0"}}>
                  <img src="/assets/images/baridhara.jpg" style={{maxHeight:'600px',width:"auto",borderRadius:"10px"}} alt="About Us" className="img-fluid" />
                </Col>
                <Col lg="6" className="about-text" style={{margin:"10px 0",padding:"0 30px"}}>
                  <div className="about-content">
                    <h2 style={{ color: "#01b060",fontSize:"40px" }}>
                      Who Are We?
                    </h2>
                    <p style={{fontSize:"16px"}}>
                      Welcome to Ashol Property LTD – Your Trusted Partner in
                      Rental Management and Real Estate Solutions!
                      <br/>               <br/>
                      At Ashol Property, we take pride in providing exceptional
                      rental management and property buy-sell services for both
                      property owners and tenants. Our mission is to make the
                      process of finding a perfect rental home or getting
                      tenants for your property hassle-free and convenient. With
                      years of experience in the industry, we have established
                      ourselves as a reliable and customer-centric company.
                      <br/>               <br/>
                      Our commitment to excellence and customer satisfaction
                      sets us apart. For property owners, we offer three
                      distinct service tiers - Grand Premium, Premium, and
                      Regular - tailored to meet various needs and budgets.
                      Whether you're looking for a comprehensive rental
                      management system or simply want assistance in finding
                      renters, we have the perfect solution for you.
                      <br/>               <br/>
                      For tenants, our services are entirely free of charge. Our
                      dedicated team works tirelessly to find the most suitable
                      rental properties that match your preferences and budget,
                      ensuring a smooth and stress-free experience.
                      <br/>               <br/>
                      With Ashol Property, you can rest assured that your
                      property and rental needs are in safe hands. Our team of
                      experts is here to assist you every step of the way,
                      providing top-notch service and support.
                      <br/>               <br/>
                      Experience the convenience and efficiency of our rental
                      management and real estate services. Join us today, and
                      let's embark on a journey to find your ideal rental
                      property or perfect renters for your listed property!
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUsSection;
