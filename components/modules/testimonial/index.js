import React, { useEffect, useState } from "react";
import { getData } from "../../../utils/getData";
import TestimonialSectionOne from "../../home/enterprise/Testimonial";
import TestimonialSectionTwo from "../../home/slider-filter-search/Testimonial";
import TestimonialSectionThree from "../../home/corporate/Testimonial";
import TestimonialSectionFour from "../../home/classic/Testimonial";

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
      <TestimonialSectionOne value={clientData?.WhatPeopleSay} />
      <TestimonialSectionTwo value={clientData?.HappyClient} normal={false} />
      <TestimonialSectionThree value={clientData?.OurClientInCorporateLayout} />
      <TestimonialSectionFour value={clientData?.OurHappyClientInClassicLayout} />
    </>
  );
};

export default BodyContent;
