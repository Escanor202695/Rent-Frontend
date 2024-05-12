/* A code snippet. */
import React from "react";
import dynamic from "next/dynamic";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../../../layout/footers/FooterThree";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";

const DynamicBodyContent = dynamic(() => import("../../../components/pages/portfolio/Masonry/index"), {
  ssr: false,
});
const Masonry4 = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <DynamicBodyContent masonryGrid={4} />
      <FooterThree />
    </>
  );
};

export default Masonry4;
