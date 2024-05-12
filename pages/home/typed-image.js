/**
 * It takes a locale and an array of namespaces, and returns an object with the translations for those
 * namespaces
 * @returns The TypedImage component is being returned.
 */
import React, { useEffect } from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Logo4, Logo7 } from "../../components/elements/Logo";
import NavbarFive from "../../layout/headers/NavbarFive";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterOne from "../../layout/footers/FooterOne";
import BodyContent from "../../components/home/typed-image";
import { ConfigDB } from "../../config/themeCustomizerConfig";

const TypedImage = () => {
  useEffect(() => {
    setTimeout(() => {
      !ConfigDB.PrimaryColor && document.documentElement.style.setProperty("--theme-default", "#6432b8");
      !ConfigDB.SecondaryColor && document.documentElement.style.setProperty("--theme-default2", "#9516d7");
    }, 0.1);
  }, []);
  return (
    <>
      <NavbarFive logo={<Logo7 />} />
      <BodyContent />
      <FooterOne logo={<Logo4 />} />
    </>
  );
};

export default TypedImage;
