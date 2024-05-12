/**
 * It takes a locale and an array of namespaces, and returns an object with the translations for those
 * namespaces
 * @returns The data is being returned as an array of objects.
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../components/property/tabPanelPages";
import SliderSection from "../../components/property/tabPanelPages/Slider";
import FooterThree from "../../layout/footers/FooterThree";
import NavbarFive from "../../layout/headers/NavbarFive";

//export const getStaticProps = async ({ locale }) => ({
//  props: { ...(await serverSideTranslations(locale, ["common"])) },
// });
import { getData } from "../../utils/getData";

const View360 = () => {
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState({});

  useEffect(() => {
    getData(`${process.env.API_URL}/property`)
      .then((res) => {
        setValue(
          Object.keys(res.data)
            .map((key) => [res.data[key]])
            .flat(2)
            .filter((item) => item.id === id)
            .pop()
        );
      })
      .catch((error) => console.log("Error", error));
  }, [id]);

  return (
    <>
      <NavbarFive />
      <BodyContent singleData={value}>
        <SliderSection singleData={value?.img} />
      </BodyContent>
      <FooterThree />
    </>
  );
};

export default View360;
