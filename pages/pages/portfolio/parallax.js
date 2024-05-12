/**
 * It takes the locale from the request object and returns the translated strings for the given
 * namespaces
 * @returns a React component.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../../components/pages/portfolio/parallax";
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
