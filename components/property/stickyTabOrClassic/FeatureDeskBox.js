import React from "react";
import { Col, Row } from "reactstrap";
import { Check } from "react-feather";

const FeatureDeskBox = ({ data }) => {
  const additionalFeatures = data?.additionalFeatures || [];
  const splitIndex = 5;

  const firstGroup = additionalFeatures?.slice(0, splitIndex);
  const secondGroup = additionalFeatures?.slice(splitIndex);

  return (
    <div className="desc-box" id="feature">
      <div className="page-section feature-dec">
        <h4 className="content-title">features</h4>
        <Row className="single-feature">
          <Col xs={6}>
            {firstGroup.map((feature, index) => (
              <div key={index}>
                <Check style={{ color: "#00B160" }} /> {feature}
              </div>
            ))}
          </Col>
          {secondGroup.length > 0 && (
            <Col xs={6}>
              {secondGroup.map((feature, index) => (
                <div key={index}>
                  <Check style={{ color: "#00B160" }} /> {feature}
                </div>
              ))}
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default FeatureDeskBox;
