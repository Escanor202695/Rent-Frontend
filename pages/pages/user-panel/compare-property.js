import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../../../layout/footers/FooterThree";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import PropertyCompare from "../../../components/pages/userPanel/compareproperty";

const CompareProperty = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <PropertyCompare />
      <FooterThree />
    </>
  );
};

export default CompareProperty;
