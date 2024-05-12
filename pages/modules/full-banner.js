import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FooterThree from "../../layout/footers/FooterThree";
import NavbarThree from "../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import BodyContent from "../../components/modules/fullBanner";

const FullBanner = () => {
  return (
    <>
      <NavbarThree />
      <BodyContent />
      <FooterThree />
    </>
  );
};

export default FullBanner;
