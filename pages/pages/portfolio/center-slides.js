/**
 * It takes the locale from the context and returns the props for the page
 * @returns a React component.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../../components/pages/portfolio/centerSlides";
import FooterThree from "../../../layout/footers/FooterThree";
import NavbarFive from "../../../layout/headers/NavbarFive";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const parallax = () => {
  return (
    <>
      <NavbarFive />
      <BodyContent />
      <FooterThree />
    </>
  );
};

export default parallax;
