import React, { useEffect, useState } from "react";
import { AppPropertyData } from "../../../data/appPropertyData";
import { getData } from "../../../utils/getData";
import BrandSection from "../enterprise/Brand";
import FeatureSection from "../enterprise/Feature";
import LatestBlogSection from "../enterprise/LatestBlog";
import ParallaxBannerSection from "../enterprise/ParallaxBanner";
import PropertyOfTheDaySection from "../enterprise/PropertyOfTheDay";
import PropertyServicesSection from "../enterprise/Propertyservices";
import PropertyTabSection from "../enterprise/PropertyTab";
import TestimonialSection from "../enterprise/Testimonial";
import HomeBannerSection from "./HomeBanner";
import LatestPropertyListingSection from "./LatestPropertyListing";

const BodyContent = () => {
  const [propertyData, setPropertyData] = useState();
  const [clientData, setClientData] = useState();

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const propertyResponse = await getData(`${process.env.API_URL}/property`);
        setPropertyData(propertyResponse.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    const fetchClientData = async () => {
      try {
        const clientResponse = await getData(`${process.env.API_URL}/client-agent`);
        setClientData(clientResponse.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    fetchPropertyData();
    fetchClientData();
  }, []);

  return (
    <>
      <HomeBannerSection />
      <LatestPropertyListingSection
        value={propertyData?.ListingPropertyInModernVideoLayout}
      />
      <PropertyTabSection value={propertyData} />
      <PropertyOfTheDaySection value={propertyData?.PropertyOfTheDay} />
      <PropertyServicesSection value={AppPropertyData?.PropertyServices} />
      <FeatureSection value={AppPropertyData?.FeaturedCitiesInEnterprise} />
      <ParallaxBannerSection />
      <TestimonialSection value={clientData?.WhatPeopleSay} />
      <LatestBlogSection value={propertyData?.LatestBlogInEnterprise} />
      <BrandSection />
    </>
  );
};

export default BodyContent;
