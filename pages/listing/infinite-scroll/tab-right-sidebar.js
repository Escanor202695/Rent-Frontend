/**
 * `getStaticProps` is a Next.js function that fetches data at build time
 * @returns A function that returns a component.
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
      <GridView side={"right"} size={3} gridType={"grid-view"} gridBar={false} tabHeader={true} infiniteScroll={true} />
      <FooterThree />
    </>
  );
};

export default TabRightSidebar;
