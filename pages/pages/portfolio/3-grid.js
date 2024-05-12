/* A way to import a component that is not needed to be rendered on the server side. */
import React from "react";
import dynamic from "next/dynamic";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../../../layout/footers/FooterThree";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";

const DynamicBodyContent = dynamic(() => import("../../../components/pages/portfolio/grid/index.js"), {
  ssr: false,
});
const Grid3 = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <DynamicBodyContent gridClass='col-lg-4' />
      <FooterThree />
    </>
  );
};

export default Grid3;
