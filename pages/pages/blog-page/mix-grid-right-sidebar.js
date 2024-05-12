/**
 * It takes the locale from the context and returns the translated strings for the given namespaces
 * @returns an object with a property called props. The props property is an object that contains the
 * translations for the current locale.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../../components/pages/blogPage/mixGridSidebar";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../../layout/footers/FooterThree";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const MixGridRightSidebar = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent side={"right"} />
      <FooterThree />
    </>
  );
};
export default MixGridRightSidebar;
