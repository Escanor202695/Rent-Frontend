// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BodyContent from "../../../components/pages/blogDetailPages";
import Breadcrumb from "../../../layout/Breadcrumb/Breadcrumb";
import FooterThree from "../../../layout/footers/FooterThree";
import NavbarThree from "../../../layout/headers/NavbarThree";
import Img from "../../../utils/BackgroundImageRatio";

// export const getStaticProps = async ({ locale }) => ({ props: { ...(await serverSideTranslations(locale, ["common"])) } });

const RightSidebar = () => {
  return (
    <>
      <NavbarThree />
      <Breadcrumb />
      <BodyContent side={"right"}>
        <div className="blog-detail-image">
          <Img src="/assets/images/parallax/4.jpg" className="bg-img img-fluid" alt="" />
        </div>
      </BodyContent>
      <FooterThree />
    </>
  );
};
export default RightSidebar;
