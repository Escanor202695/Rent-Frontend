/* A way to import a component that is not needed to be rendered on the server side. */
import React from "react";
import dynamic from "next/dynamic";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../../../layout/footers/FooterThree";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";

const DynamicBodyContent = dynamic(() => import("../../../components/pages/portfolio/creative/index.js"), {
  ssr: false,
});
const Creative4 = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <DynamicBodyContent />
      <FooterThree />
    </>
  );
};

export default Creative4;
