import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { LatestForSale, Rent } from "../../../constValues/constValues";
import PropertyBox from "../../elements/propertyBoxs/PropertyBox";
import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { inputsReducer } from "../../../redux-toolkit/reducers/inputsReducer";

const PropertySection = ({ value, range }) => {
  const inputFilter = useSelector((state) => state.inputsReducer);

  const router = useRouter();
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);

  const getProperties = async () => {
    try {
      const response = await axios.get(
        "https://backend.asholproperty.com/property-items",
        {
          params: {
            filter: {
              where: {
                IsFeatured: "Yes",
                status: "Live" || "live",
              },
            },
          },
        }
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      {properties.length !== 0 && (
        <section className="property-section">
          <Container>
            <Row className="ratio_55">
              <Col>
                <div className="title-1">
                  <h2>Featured Properties</h2>
                  <hr />
                </div>
                <Row className="property-2 column-space">
                  {properties &&
                    properties
                      .slice(
                        `${range ? range[0] : 0}`,
                        `${range ? range[1] : 3}`
                      )
                      .map((data, i) => (
                        <Col xl="4" md="6" className="wow fadeInUp" key={i}>
                          <PropertyBox data={data} />
                        </Col>
                      ))}
                </Row>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-gradient link"
                style={{ margin: "40px auto", width: "120px" }}
                onClick={() => {
                  router.push("/properties");
                  dispatch({ type: "IsFeatured", payload: "Yes" });
                }}
              >
                See All
              </button>
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default PropertySection;
