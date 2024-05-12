import React, { useEffect } from "react";
// // import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../components/home/classic";
import NavbarFour from "../../layout/headers/NavbarFour";
import FooterFour from "../../layout/footers/FooterFour";
import { ConfigDB } from "../../config/themeCustomizerConfig";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
const Classic = () => {
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

export default Classic;
