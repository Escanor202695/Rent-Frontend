/**
 * It takes a locale as an argument and returns a props object with the translations for the given
 * locale
 * @returns an object with a property called props. The props property is an object that contains the
 * translations for the current locale.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import BodyContent from "../../../components/pages/blogPage/sidebarPage";
import FooterThree from "../../../layout/footers/FooterThree";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const RightSidebar = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent side={"right"} />
      <FooterThree />
    </>
  );
};

export default RightSidebar;
