/**
 * It fetches data from the API and then passes it to the component
 * @returns The data is being returned as an array of objects.
 */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../components/property/tabPanelPages";
import FooterThree from "../../layout/footers/FooterThree";
import NavbarFive from "../../layout/headers/NavbarFive";

//export const getStaticProps = async ({ locale }) => ({
//  props: { ...(await serverSideTranslations(locale, ["common"])) },
// });
import ImgBox from "../../components/property/tabPanelPages/ImageBox";
import { getData } from "../../utils/getData";

const ImageBox = () => {
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
        <ImgBox singleData={value?.img} />
      </BodyContent>
      <FooterThree />
    </>
  );
};

export default ImageBox;
