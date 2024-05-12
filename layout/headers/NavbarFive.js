import React,{useState,useEffect} from "react";
import { Col, Row, Container } from "reactstrap";
import { Logo6 } from "../../components/elements/Logo";
import MainNav from "./elements/MainNav";
import RightNav from "./elements/RightNav";

const NavbarFive = ({ logo }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Check if localStorage is available in the browser environment
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setUser({ id: id, role: role });
    }
  }, []);
  return (
    <header className="header-1 header-9 inner-page light-header shadow-cls">
      <Container>
        <Row>
          <Col>
            <div className="menu">
              {logo || <Logo6 />}
              <MainNav user={user} />
              <RightNav user={user} />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default NavbarFive;
