/* A way to import a component that is not SSR compatible. */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import NavbarSix from "../../../../layout/headers/NavbarSix";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../../../../layout/footers/FooterThree";
import GridView from "../../../../components/listing/gridView/grid/GridView";

const MyAwesomeMap = dynamic(() => import("../../../../components/listing/gridView/map/LeafletMap"), { ssr: false });
const LeafletMap = () => {
  return (
    <>
      <NavbarSix />
      <section className='layout-map header-map'>
        <MyAwesomeMap />
      </section>
      <GridView side={"left"} size={2} gridType={"grid-view"} gridBar={true} />
      <FooterThree />
    </>
  );
};

export default LeafletMap;
