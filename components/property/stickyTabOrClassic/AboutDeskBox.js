import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

const AboutDeskBox = ({ data }) => {
  const [newData, setNewData] = useState();

  useEffect(() => {
    const newD = data
    setNewData(newD);
    console.log(data);
  }, [data]);

  return (
    <div className="about page-section" id="about">
      <h4>Property Brief</h4>
      <Row>
        <Col sm="4" md="12">
          <pre style={{ whiteSpace: "pre-line", color: "black" }}>
            {newData}
          </pre>
        </Col>
      </Row>
    </div>
  );
};

export default AboutDeskBox;
