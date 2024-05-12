/**
 * It's a function that returns
 * @returns a React component.
 */
import React, { useState } from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarThree from "../../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import FooterThree from "../../../../layout/footers/FooterThree";
import Breadcrumb from "../../../../layout/Breadcrumb/Breadcrumb";
import GridView from "../../../../components/listing/gridView/grid/GridView";
import MapModal from "../../../../components/listing/gridView/MapModal";
import Pigeon from "../../../../components/listing/gridView/map/PigeonMap";

const PigeonMap = () => {
  const [mapModal, setMapModal] = useState(false);
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <GridView side={"left"} size={2} gridType={"grid-view"} mapModal={true} mapView={true} gridBar={true} setMapModal={setMapModal} />
      <MapModal mapModal={mapModal} setMapModal={setMapModal}>
        <Pigeon />
      </MapModal>
      <FooterThree />
    </>
  );
};

export default PigeonMap;
