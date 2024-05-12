import React, { useEffect, useState } from "react";
import { AppPropertyData } from "../../../../data/appPropertyData";
import { getData } from "../../../../utils/getData";
import BlogSection from "../../../home/corporate/Blog";
import ServiceSection from "../../../home/corporate/Service";
import TestimonialSection from "../../../home/enterprise/Testimonial";
import AboutSection from "../../../home/slider-filter-search/About";
import AboutUsSection from "./AboutUs";

const BodyContent = () => {
  const [value, setValue] = useState();
  const [clientData, setClientData] = useState();

  useEffect(() => {
    getData(`${process.env.API_URL}/property`)
      .then((res) => {
        setValue(res.data);
      })
      .catch((error) => console.log("Error", error));
    getData(`${process.env.API_URL}/client-agent`)
      .then((res) => {
        setClientData(res.data);
      })
      .catch((error) => console.log("Error", error));
  }, []);
  return (
    <>
      <AboutUsSection />
      <ServiceSection value={AppPropertyData?.ProvidedServices} />
      <AboutSection value={clientData?.MeetOurAgent} />
      <div className="bg-light">
        <TestimonialSection value={clientData?.WhatPeopleSay} />
      </div>
      <BlogSection value={value?.LatestBlogInCorporate} />
    </>
  );
};

export default BodyContent;
