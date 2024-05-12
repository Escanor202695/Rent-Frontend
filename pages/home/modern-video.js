/**
 * It takes the locale from the context and returns the translations for the given namespaces
 * @returns The return value of the function is an object with a props property.
 */
import React, { useEffect } from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import NavbarFour from "../../layout/headers/NavbarFour";

//export const getStaticProps = async ({ locale }) => ({
//  props: { ...(await serverSideTranslations(locale, ["common"])) },
// });
import FooterThree from "../../layout/footers/FooterThree";
import BodyContent from "../../components/home/modern-video";
import { ConfigDB } from "../../config/themeCustomizerConfig";

const ModernVideo = () => {
  useEffect(() => {
    setTimeout(() => {
      !ConfigDB.PrimaryColor &&
        document.documentElement.style.setProperty(
          "--theme-default",
          "#ff5c41"
        );
      !ConfigDB.SecondaryColor &&
        document.documentElement.style.setProperty(
          "--theme-default2",
          "#00B160"
        );
    }, 0.1);
  }, []);
  return (
    <>
      <Head>
        <title>ashole property</title>
      </Head>
      <NavbarFour />
      <BodyContent />
      <FooterThree />
    </>
  );
};

export default ModernVideo;
