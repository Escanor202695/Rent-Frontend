import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FooterThree from "../../layout/footers/FooterThree";
import NavbarThree from "../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import Breadcrumb from "../../layout/Breadcrumb/Breadcrumb";
import BodyContent from "../../components/modules/about";

const button = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent />
      <FooterThree />
    </>
  );
};

export default button;
