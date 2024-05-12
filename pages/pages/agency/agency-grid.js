import React, { useEffect, useState } from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NavbarThree from "../../../layout/headers/NavbarThree";

//export const getStaticProps = async ({ locale }) => ({
//  props: { ...(await serverSideTranslations(locale, ["common"])) },
// });
import FooterThree from "../../../layout/footers/FooterThree";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import BodyContent from "../../../components/pages/agency/agencyGrid";
import { getData } from "../../../utils/getData";

const AgencyProfile = () => {
  const [clientData, setClientData] = useState();

  useEffect(() => {
    getData(`${process.env.API_URL}/client-agent`)
      .then((res) => {
        setClientData(res.data?.agencyList);
      })
      .catch((error) => console.log("Error", error));
  }, []);
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent clientData={clientData} />
      <FooterThree />
    </>
  );
};

export default AgencyProfile;
