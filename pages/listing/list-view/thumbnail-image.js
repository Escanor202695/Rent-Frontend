/**
 * It takes a locale as an argument and returns a props object with the locale and the translations for
 * the common namespace
 * @returns A function that returns a React element.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import GridView from "../../../components/listing/gridView/grid/GridView";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../../layout/footers/FooterThree";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const ThumbnailImage = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <GridView side={false} size={3} gridType={"list-view"} listSize={2} relativeSlider={true} gridBar={false} AdvancedSearchShow={true} />
      <FooterThree />;
    </>
  );
};

export default ThumbnailImage;
