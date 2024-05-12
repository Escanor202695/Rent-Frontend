import React, { useState, useEffect } from "react";
import NavBarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";
import Breadcrumb from "../layout/Breadcrumb/Breadcrumb";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useRouter } from "next/router"; // Import useRouter from next/router
import axios from "axios";
import {
  Home,
  Briefcase,
  AlertCircle,
  PlusCircle,
} from "react-feather";
import RentersTable from "../components/renters";



const LeftSidebar = () => {
  const [id, setId] = useState();
  const [role, setRole] = useState("");
  const [rentersData, setRentersData] = useState([]);
  const [assets,setAssets]=useState(0);
  const [renters,setRenters]=useState(0);
  const [properties,setProperties]=useState(0);
  const router = useRouter();


  useEffect(() => {
    // Check if localStorage is available in the browser environment
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setId(id);
      setRole(role);
      fetchData(id);
      fetchRentersData();
    }
  }, []);

  useEffect(() => {
    console.log(rentersData);
  }, [rentersData]);
  const fetchRentersData = async () => {
    try {
      // Fetch renters data using localStorage
      const id = localStorage.getItem("id"); // You need to implement localStorage usage
      const response = await axios.get(
        `https://backend.asholproperty.com/renters/`,
        {
          params: {
            filter: {
              where: {
                ownerId: id,
              },
            },
          },
        }
      );
      setRentersData(response.data);
      window.reload;
    } catch (error) {
      console.error("Error fetching renters data:", error);
    }
  };


  const fetchData = async (id) => {
    try {
      const assetsResponse = await axios.get(`https://backend.asholproperty.com/user-assets`, {
        params: {
          filter: {
            where: {
              ownercustomerId: id,
            },
          },
        },
      });
  
      setAssets(assetsResponse.data.length);
  
      await Promise.all(assetsResponse.data.map(async (asset) => {
        const propertiesResponse = await axios.get(`https://backend.asholproperty.com/assets-properties`, {
          params: {
            filter: {
              where: {
                userAssetsId: asset.id,
              },
            },
          },
        });
        
        setProperties(properties + propertiesResponse.data.length);
      }));
  
      const renterResponse = await axios.get(`https://backend.asholproperty.com/renters`, {
        params: {
          filter: {
            where: {
              ownerId: id,
            },
          },
        },
      });
  
      setRenters(renterResponse.data.length);
  
      console.log(propertiesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handleCreateProperty = () => {
    router.push("/assets"); // Navigate to "/listing-request" route
  };
  const sendToRenter = () => {
    router.push("/renters"); // Navigate to "/listing-request" route
  };
  return (
    <>
      <NavBarFive />
      <Breadcrumb />
      <section
        className="property-section"
        style={{ padding: "100px 10%", width: "100vw", overflow: "hidden" }}
      >
        <Container className="pb-4">
          <Row className="d-flex flex-wrap align-items-stretch justify-content-center text-center">
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100">
                <CardBody className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-column align-items-center">
                    <h5 className="h5-responsive d-flex text-center">
                      <Home className="feather-icon me-2" />
                      Total Assets
                    </h5>
                    <h4 className="h4-responsive">{assets}</h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100">
                <CardBody className="d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="h5-responsive">
                      <Briefcase className="feather-icon me-1" />
                      Total Properties
                    </h5>
                    <h4 className="h4-responsive">{properties}</h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100">
                <CardBody className="d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="h5-responsive">
                      <AlertCircle className="feather-icon me-1" />
                      Total Rented
                    </h5>
                    <h4 className="h4-responsive">{renters}</h4>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <Card className="h-100">
                <CardBody className="d-flex flex-column justify-content-between align-items-center">
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <button
                      className="btn btn-primary mt-3"
                      onClick={handleCreateProperty}
                    >
                      <PlusCircle className="feather-icon me-1 " />
                      Create Property
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <div className="dashboard-table">
          <RentersTable rentersData={rentersData} />
        </div>
      </section>

      <FooterThree />
    </>
  );
};

export default LeftSidebar;
