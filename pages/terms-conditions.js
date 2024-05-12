import React from "react";
import NavbarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";

function TermsAndConditions(props) {
  const pdfFilePath = "/assets/files/terms.pdf";

  return (
    <div>
      <NavbarFive />
      <div className="pdf-container" style={{ backgroundColor:"black",height: "100vh",width:"100vw", overflow: "auto" }}>
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
