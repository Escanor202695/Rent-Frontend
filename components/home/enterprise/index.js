/**
 * It fetches data from the API and passes it to the components
 * @returns The return value of the function is the value of the last expression in the function body.
 */
import React, { useEffect, useState } from "react";
import { AppPropertyData } from "../../../data/appPropertyData";
import { getData } from "../../../utils/getData";
import BrandSection from "./Brand";
import FeatureSection from "./Feature";
import HomeBannerOwner from "./HomeBanner";
import HomeBannerCustomer from "../../../components/home/slider-filter-search/HomeBanner.js";
import LatestBlogSection from "./LatestBlog";
import LatestPropertySection from "./LatestProperty";
import PropertySection from "../../../components/home/slider-filter-search/Property.js";
import ParallaxBannerSection from "./ParallaxBanner";
import PropertyOfTheDaySection from "./PropertyOfTheDay";
import PropertyServicesSection from "./Propertyservices";
import PropertyTabSection from "./PropertyTab";
import TestimonialSection from "./Testimonial";

const BodyContent = () => {
  const [value, setValue] = useState();
  const [clientData, setClientData] = useState();

  const [id, setId] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    // Check if localStorage is available in the browser environment
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setId(id);
      setRole(role);
    }
  }, []);


  return (
    <>
      {role === "owner" ? <HomeBannerOwner /> : <HomeBannerCustomer />}
      <PropertyServicesSection />
      <PropertySection />
      <FeatureSection value={AppPropertyData?.FeaturedCitiesInEnterprise} />
      <TestimonialSection value={clientData?.WhatPeopleSay} />
    </>
  );
};

export default BodyContent;
