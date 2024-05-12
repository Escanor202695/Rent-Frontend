import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { FooterData } from "../../data/footerData";
import FooterLink from "./elements/FooterLink";
import FooterBlog from "./footerThreeElements/FooterBlog";
import FooterContactUsDetails from "./footerThreeElements/FooterContactUsDetails";
import SubFooterTwo from "./elements/SubFooterTwo";

const FooterThree = () => {
  const [isActive, setIsActive] = useState();

  return (
    <footer>
      <div className="footer footer-bg">
        <Container>
          <Row className="d-flex justify-content-center">
            <FooterContactUsDetails />
            <Col xl={5}>
              <Row className="d-flex justify-content-center">
                <FooterLink
                  value={FooterData?.usefulLinks}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />
                <FooterLink
                  value={FooterData?.feature}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default FooterThree;
