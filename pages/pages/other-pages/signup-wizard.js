import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../../components/pages/otherPages/signUpWizard";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../../layout/footers/FooterThree";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const SignupWizard = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent />
      <FooterThree />
    </>
  );
};

export default SignupWizard;
