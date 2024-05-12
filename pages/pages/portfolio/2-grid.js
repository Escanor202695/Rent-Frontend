/* A code snippet. */
import React from "react";
import dynamic from "next/dynamic";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarThree from "../../../layout/headers/NavbarThree";
import FooterThree from "../../../layout/footers/FooterThree";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
const DynamicBodyContent = dynamic(() => import("../../../components/pages/portfolio/grid/index.js"), {
  ssr: false,
});
const Grid2 = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <DynamicBodyContent size={6} />
      <FooterThree />
    </>
  );
};

export default Grid2;
