/**
 * It takes a locale as an argument and returns an object with the translations for that locale
 * @returns The return value of the function is an object with a props property.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../components/property/stickyTabOrClassic";
import FooterThree from "../../layout/footers/FooterThree";
import NavbarThree from "../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const LeftSidebar = () => {
  return (
    <>
      <NavbarThree />
      <BodyContent side={"left"} />
      <FooterThree />
    </>
  );
};

export default LeftSidebar;
