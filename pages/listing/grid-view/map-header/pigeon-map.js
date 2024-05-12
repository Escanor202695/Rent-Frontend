/**
 * It takes a locale and an array of namespaces, and returns an object with the translations for those
 * namespaces
 * @returns The PigeonMap component is being returned.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarSix from "../../../../layout/headers/NavbarSix";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../../../../layout/footers/FooterThree";
import GridView from "../../../../components/listing/gridView/grid/GridView";
import Pigeon from "../../../../components/listing/gridView/map/PigeonMap";

const PigeonMap = () => {
  return (
    <>
      <NavbarSix />
      <section className='layout-map header-map'>
        <Pigeon />
      </section>
      <GridView side={"left"} size={2} gridType={"grid-view"} gridBar={true} />
      <FooterThree />
    </>
  );
};

export default PigeonMap;
