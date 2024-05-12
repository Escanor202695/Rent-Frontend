import React from "react";
import NavbarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";

function TermsAndConditions(props) {
  const pdfFilePath = "/assets/files/policy.pdf"; // Adjust the path based on your public folder structure

  return (
    <div>
      <NavbarFive />
      <div style={{ backgroundColor:"black",height: "100vh",width:"100vw", overflow: "auto",paddingTop:"88px" }}>
        <iframe
          title="PDF Viewer"
          src={pdfFilePath}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
        />
      </div>
      <FooterThree />
    </div>
  );
}

export default TermsAndConditions;
