import React, { useEffect, useState } from "react";
import { getData } from "../../../utils/getData";
import AboutSectionOne from "../../home/slider-filter-search/About";
import AboutSectionTwo from "../../home/corporate/About";
import AboutSectionThree from "../../home/classic/About";

const BodyContent = () => {
  const [clientData, setClientData] = useState();

  useEffect(() => {
    getData(`${process.env.API_URL}/client-agent`)
      .then((res) => {
        setClientData(res.data);
      })
      .catch((error) => console.log("Error", error));
  }, []);

  return (
    <>
      <AboutSectionOne value={clientData?.MeetOurAgent} />
      <div className="bg-light section-pb">
        <AboutSectionTwo value={clientData?.OurAgentInCorporateLayout} />
      </div>
      <AboutSectionThree value={clientData?.OurAgentInClassicLayout} />
    </>
  );
};

export default BodyContent;
