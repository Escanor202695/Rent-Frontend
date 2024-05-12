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

const LeftSidebar = () => {
  const [properties, setProperties] = useState([]);
  const [id, setId] = useState();
  const [role, setRole] = useState("");
  const [called, setCalled] = useState(false);

  useEffect(() => {
    // Check if localStorage is available in the browser environment
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setId(id);
      setRole(role);
    }
  }, []);

  const getProperties = async () => {
    //console.log("get property called", id);
    try {
      const response = await axios.get(
        "https://backend.asholproperty.com/property-items",
        {
          params: {
            filter: {
              where: {
                ownercustomerId: id,
              },
            },
          },
        }
      );
      setCalled(true);
      setProperties(response.data);
      // setTotalPages(Math.ceil(response.data.length / 6));
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
        {properties.length === 0 ? (
          <div style={{ textAlign: "center", width: "100%" }}>
            No properties listed
          </div>
        ) : (
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
                </Row>
              </Col>
            </Row>
          </Container>
        )}
      </section>
      <FooterThree />
    </>
  );
};

export default LeftSidebar;
