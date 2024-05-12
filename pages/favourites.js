/**
 * It fetches the translations from the server and passes them to the component as props
 * @returns A React component.
 */
import React, { useState, useEffect } from "react";
import NavBarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";
import Breadcrumb from "../layout/Breadcrumb/Breadcrumb";
import { Col, Container, Row } from "reactstrap";
import PropertyBox from "../components/elements/propertyBoxs/PropertyBox";
import axios from "axios";
import { Heart } from "react-feather";

const Favourites = () => {
  const [properties, setProperties] = useState([]);
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [called, setCalled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setId(id);
      setRole(role);
    }
  }, []);

  const getProperties = async () => {
    try {
      const response = await axios.get(
        `https://backend.asholproperty.com/ownercustomers/${id}/favourites`
      );
      //console.log("get property called", id);

      setCalled(true);
      const propertyArray = response.data.map((item) => item.property);
      setProperties(propertyArray);
      //console.log(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!called && id) getProperties();
  }, [id]);

  return (
    <>
      <NavBarFive />
      <Breadcrumb />
      <section className="property-section">
        <Container>
          <Row className="ratio_55">
            <Col>
              <Row className="property-2 column-space">
                {properties &&
                  properties.map((data, i) => (
                    <Col xl="4" md="6" className="wow fadeInUp" key={i}>
                      <PropertyBox data={data} />
                    </Col>
                  ))}
                {properties.length === 0 && (
                  <div>you haven't saved any property to your favourites!</div>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <FooterThree />
    </>
  );
};

export default Favourites;
