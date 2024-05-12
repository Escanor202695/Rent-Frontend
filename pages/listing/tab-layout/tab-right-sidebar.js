/**
 * It takes a locale and an array of namespaces and returns an object with the translations for those
 * namespaces
 * @returns The return value of the function is an object with a props property.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GridView from "../../../components/listing/gridView/grid/GridView";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../../layout/footers/FooterThree";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const TabRightSidebar = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <GridView side={"right"} size={2} gridType={"grid-view"} gridBar={false} tabHeader={true} />
      <FooterThree />
    </>
  );
};

export default TabRightSidebar;
