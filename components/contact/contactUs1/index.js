/**
 * It returns a fragment containing the GetInTouchSection and ContactDetailsSection components
 * @returns A React component
 */
import React from "react";
import ContactDetailsSection from "./ContactDetails";
import GetInTouchSection from "./GetInTouch";

const BodyContent = () => {
  return (
    <>
      <ContactDetailsSection />      
    </>
  );
};

export default BodyContent;
