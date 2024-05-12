/**
 * It takes in a label, lg, and sm, and returns a row with a dropdown input field, a range input field,
 * and a button
 * @returns an object with the key of the property and the value of the property.
 */

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { getData } from "../../../../utils/getData";
import { DropdownInputFields } from "../../../elements/DropdownInputFields";
import RangeInputFields from "../../../elements/RangeInputFields";

const InputForm = ({ label, lg, sm, lastSm, userId,getProperties,reset}) => {

  return (
    <Row className="gx-3">
      <DropdownInputFields
        label={label}
        start={0}
        end={6}
        lg={lg}
        sm={sm}
        lastSm={lastSm}
        getProperties={getProperties}
        reset={reset}
      />
    </Row>
  );
};

export default InputForm;
