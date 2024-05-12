/**
 * It fetches the translations from the server and passes them to the component as props
 * @returns The return value of the function is an object with a props property. This object will be
 * merged with the component’s existing props.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarFive from "../../../../layout/headers/NavbarFive";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import Breadcrumb3 from "../../../../layout/Breadcrumb/Breadcrumb3";
import FooterThree from "../../../../layout/footers/FooterThree";
import MapView from "../../../../components/listing/gridView/map/MapView";
import Pigeon from "../../../../components/listing/gridView/map/PigeonMap";

const PigeonMap = () => {
  return (
    <>
      <NavbarFive />
      <Breadcrumb3 />
      <MapView gridType={"list-view"} side={"right"}>
        <Pigeon />
      </MapView>
      <FooterThree />
    </>
  );
};

export default PigeonMap;
