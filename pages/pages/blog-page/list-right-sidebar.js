/**
 * It takes a locale as an argument and returns an object with the translations for that locale
 * @returns an object with a property called props. The props property is an object that contains the
 * translations.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../../components/pages/blogPage/ListSidebar";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../../layout/footers/FooterThree";
import NavbarThree from "../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const ListRightSidebar = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent side={"right"} />
      <FooterThree />
    </>
  );
};

export default ListRightSidebar;
