/**
 * It returns a section with a container with a row with three columns, each of which has a div with a
 * contact icon, a heading, and a paragraph
 * @returns The ContactDetailsSection component is being returned.
 */
import React from "react";
import { Mail, MapPin } from "react-feather";
import { Col, Container, Row } from "reactstrap";

const ContactDetailsSection = () => {
  return (
    <section className="small-section contact_section contact_bottom">
      <Container>
        <Row className="d-flex justify-content-center">
          <Col lg="4" sm="6">
            <div className="contact_wrap" >
              <MapPin />
              <h4>Where ?</h4>
              <p className="font-roboto">
                Address - 367 Gawair, Hassen Tower,
                <br /> Dakhshin Khan, Dhaka 1230
              </p>
            </div>
          </Col>
          <Col lg="4" sm="6">
            <div className="contact_wrap">
              <Mail />
              <h4>Contact Info</h4>
              <ul style={{color:"#647489"}}>
                Email: info@asholproperty.com
                <br />
                Hotline: 09613825455
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactDetailsSection;
