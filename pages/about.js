import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarFive from "../layout/headers/NavbarFive";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../layout/footers/FooterThree";
import Breadcrumb from "../layout/Breadcrumb/Breadcrumb";
import BodyContent from "../components/pages/otherPages/aboutUs1";

const About = () => {
  return (
    <>
      <NavbarFive />
      <Breadcrumb />
      <BodyContent />
      <FooterThree />
    </>
  );
};

export default About;
