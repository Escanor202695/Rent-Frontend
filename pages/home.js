/**
 * It takes a locale as an argument and returns an object with the translations for that locale
 * @returns The Enterprise component is being returned.
 */
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../components/home/enterprise";
import NavbarFive from "../layout/headers/NavbarFive";
import FooterThree from "../layout/footers/FooterThree";

//export const getStaticProps = async ({ locale }) => ({
//  props: { ...(await serverSideTranslations(locale, ["common"])) },
// });
const Enterprise = () => {
  return (
    <>
      <NavbarFive />
      <BodyContent />
      <FooterThree />
    </>
  );
};

export default Enterprise;
