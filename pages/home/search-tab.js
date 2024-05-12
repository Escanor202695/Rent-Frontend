/**
 * It takes a locale and an array of namespaces, and returns an object with the translations for those
 * namespaces
 * @returns The return value of the function is an object with a props property.
 */
import React, { useEffect } from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarFour from "../../layout/headers/NavbarFour";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterFour from "../../layout/footers/FooterFour";
import BodyContent from "../../components/home/search-tab";
import { ConfigDB } from "../../config/themeCustomizerConfig";

const SearchTab = () => {
  useEffect(() => {
    setTimeout(() => {
      !ConfigDB.PrimaryColor && document.documentElement.style.setProperty("--theme-default", "#f35d43");
      !ConfigDB.SecondaryColor && document.documentElement.style.setProperty("--theme-default2", "#f34451");
    }, 0.1);
  }, []);
  return (
    <>
      <NavbarFour />
      <BodyContent />
      <FooterFour />
    </>
  );
};

export default SearchTab;
