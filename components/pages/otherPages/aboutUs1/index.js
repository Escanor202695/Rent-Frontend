import React, { useEffect, useState } from "react";
import { AppPropertyData } from "../../../../data/appPropertyData";
import { getData } from "../../../../utils/getData";
import PropertyServicesSection from "../../../home/enterprise/Propertyservices";
import AboutUsSection from "./AboutUs";

const BodyContent = () => {
  const [value, setValue] = useState();
  const [clientData, setClientData] = useState();
  return (
    <>
      <AboutUsSection />
      <div className="bg-light">
        {/* Fix the import path here */}
        <PropertyServicesSection value={AppPropertyData?.PropertyServices} />
      </div>
    </>
  );
};

export default BodyContent;
