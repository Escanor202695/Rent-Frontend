import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NavbarFive from "../../layout/headers/NavbarFive";
import { toast } from "react-toastify";
import ProfileView from "../../components/profile/profileView";
import { useRouter } from "next/router";
import FooterThree from "../../layout/footers/FooterThree";

const MyProfileTab = () => {
  const [profileDetail, setProfileDetail] = useState({});
  const router = useRouter();
  const id = router.query.id;
  const getprofile = async () => {
    //console.log(id);
    axios
      .get(`https://backend.asholproperty.com/ownercustomers/${id}`)
      .then((response) => {
        setProfileDetail(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  useEffect(() => {
    getprofile();
  }, []);

  return (
    <>
      <NavbarFive />
      <div
        className="dashboard-content"
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
        }}
      >
        <ProfileView
          role="customer"
          profileDetail={profileDetail}
          public_view="true"
        />
      </div>
      <FooterThree />
    </>
  );
};

export default MyProfileTab;
