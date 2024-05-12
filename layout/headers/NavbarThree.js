import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Logo3 } from "../../components/elements/Logo";
import MainNav from "./elements/MainNav";
import RightNav from "./elements/RightNav";
import axios from "axios";

const NavbarThree = ({ logo }) => {
  const [user, setUser] = useState({
    id: null,
    role: null,
    membership: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      const membership = localStorage.getItem("membership");
      setUser({ id, role, membership });
    }
    test(); // Call the test function here, after setting the user state
  }, []); // Empty dependency array means this effect runs once after the initial render

  const test = () => {
    //console.log("Test function is working!");
  };

  return (
    <header className="header-2">
      <Container>
        <Row>
          <Col>
            <div className="menu">
              {logo || <Logo3 />}
              <MainNav user={user} />
              <RightNav user={user} />
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default NavbarThree;
