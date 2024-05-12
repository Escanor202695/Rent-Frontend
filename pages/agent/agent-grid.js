/**
 * It fetches data from the API and passes it to the component
 * @returns The data is being returned from the API.
 */
import React, { useEffect, useState } from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../components/pages/agency/agencyGrid";
import Breadcrumb from "../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../layout/footers/FooterThree";
import NavbarThree from "../../layout/headers/NavbarThree";

// export const getStaticProps = async ({ locale }) => ({
//   props: { ...(await serverSideTranslations(locale, ["common"])) },
// });
import { getData } from "../../utils/getData";

const AgentGrid = () => {
  const [clientData, setClientData] = useState();

  useEffect(() => {
    getData(`${process.env.API_URL}/client-agent`)
      .then((res) => {
        setClientData(res.data?.agentList);
      })
      .catch((error) => console.log("Error", error));
  }, []);
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent
        clientData={clientData}
        style={"grid-view"}
        listSize={2}
        size={3}
      />
      <FooterThree />
    </>
  );
};

export default AgentGrid;
