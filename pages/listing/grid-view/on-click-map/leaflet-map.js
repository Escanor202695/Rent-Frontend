/**
 * It's a function that returns a function that returns a function
 * @returns a React component.
 */
import React, { useState } from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import NavbarThree from "../../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../../../../layout/footers/FooterThree";
import Breadcrumb from "../../../../layout/Breadcrumb/Breadcrumb";
import GridView from "../../../../components/listing/gridView/grid/GridView";

const LeafletMap = () => {
  const MyAwesomeMap = dynamic(() => import("../../../../components/listing/gridView/map/LeafletMap"), { ssr: false });
  const [mapModal, setMapModal] = useState(false);

  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <GridView side={"left"} size={2} gridType={"grid-view"} mapModal={true} mapView={true} gridBar={true} setMapModal={setMapModal}>
        <div className={`onclick-map ${mapModal ? "d-block" : "d-none"}`}>
          <MyAwesomeMap />
        </div>
      </GridView>
      <FooterThree />
    </>
  );
};

export default LeafletMap;
