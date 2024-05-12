import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../../../layout/footers/FooterThree";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import BodyContent from "../../../components/pages/agency/agencyProfile";

const AgencyProfile = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent />
      <FooterThree />
    </>
  );
};

export default AgencyProfile;
