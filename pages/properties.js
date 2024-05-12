import React,{useState,useEffect} from "react";
import NavbarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";
import Breadcrumb from "../layout/Breadcrumb/Breadcrumb";
import GridView from "../components/listing/gridView/grid/GridView";

const Properties = () => {

  return (
    <>
      <NavbarFive />
      <Breadcrumb />
      <GridView side={"left"} size={2} gridType={"grid-view"} gridBar={true} />
      <FooterThree />
    </>
  );
};

export default Properties;
