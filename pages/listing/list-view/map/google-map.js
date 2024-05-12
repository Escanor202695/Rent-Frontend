/**
 * It fetches the translations from the server and passes them to the component as props
 * @returns a React component.
 */
import React from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarThree from "../../../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });
import Breadcrumb from "../../../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../../../layout/footers/FooterThree";
import MapView from "../../../../components/listing/gridView/map/MapView";
import Google from "../../../../components/listing/gridView/map/GoogleMap";

const GoogleMap = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <MapView gridType={"list-view"} side={"right"}>
        <Google />
      </MapView>
      <FooterThree />
    </>
  );
};

export default GoogleMap;
