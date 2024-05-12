import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../components/modules/feature";
import Breadcrumb from "../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../layout/footers/FooterThree";
import NavbarThree from "../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const Feature = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent />
      <FooterThree />
    </>
  );
};

export default Feature;
