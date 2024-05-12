import Link from "next/link";
import OwnerForm from "../components/signup/ownerForm";
import CustomerForm from "../components/signup/customerForm";
import React, { useState, useRef, useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { User, UserCheck } from "react-feather";
import axios from "axios";
import FooterThree from "../layout/footers/FooterThree";
import NavbarFive from "../layout/headers/NavbarFive";

const SignUp = () => {
  const initialState = {
    isSubmittingForm: false,
    selectedImage: null,
    selectedNidImage: null,
    selectedSignImage: null,
    showpassword: false,
    signature: null,
    areaArray: [],
    subareaArray: [],
    latitude: null,
    longitude: null,
    confirmPassword: "",
    areaId: "",
    subAreaId: "",
  };

  const [state, setState] = useState(initialState);
  const [selectedRole, setSelectedRole] = useState("customer");
  const router = useRouter();

  // fetch areas data
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(
          "https://backend.asholproperty.com/areas"
        );
        setState((prevState) => ({
          ...prevState,
          areaArray: response.data,
        }));

        //console.log("areas", response.data);
      } catch (error) {
        //console.log(error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {}, [state.subarea]);

  // handle selected area change
  useEffect(() => {
    //console.log("areaId", state.areaId);

    const fetchSubAreas = async () => {
      //console.log("fetchSubAreas Invoked", state.areaId);
      try {
        const response = await axios.get(
          `https://backend.asholproperty.com/areas/${state.areaId}/sub-areas`
        );
        setState((prevState) => ({
          ...prevState,
          subareaArray: response.data,
        }));
      } catch (error) {
        //console.log(error);
      }
    };

    if (state.areaId) {
      //console.log(state.area);
      fetchSubAreas();
    }
  }, [state.areaId]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Request user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          // Set the latitude and longitude states with the received data
          setLatitude(lat);
          setLongitude(long);
        },
        (error) => {
          //console.log("Error getting user location:", error.message);
        }
      );
    } else {
      //console.log("Geolocation is not available in this browser.");
    }
  }, []);

  function CheckAge(value) {
    if (!value) return false; // Return false if value is falsy
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 18; // Return adjusted age - 1 if birth date hasn't happened yet this year
    }

    return age >= 18;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData?.append("file", values.nidPhoto);

    //console.log("handleSubmit Envoked");

    const nidPhotoRequest = await axios.post(
      "https://backend.asholproperty.com/buckets/upload-pdf",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const formData2 = new FormData();
    formData2.append("file", values.profilePhoto);

    const profilePhotoRequest = await axios.post(
      "https://backend.asholproperty.com/buckets/upload",
      formData2,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const formData3 = new FormData();
    formData3.append("file", values.signPhoto);

    const signPhotoRequest = await axios.post(
      "https://backend.asholproperty.com/buckets/upload-pdf",
      formData3,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    try {
      const [nidPhotoResponse, profilePhotoResponse, signPhotoResponse] =
        await Promise.all([
          nidPhotoRequest,
          profilePhotoRequest,
          signPhotoRequest,
        ]);

      if (values.password !== state.confirmPassword) {
        //console.log(values.password, state.confirmPassword);
        toast.error("Passwords do not match!");
        return;
      }

      if (
        (profilePhotoResponse.data?.success == true &&
          nidPhotoResponse.data?.success == true &&
          signPhotoResponse.data?.success == true &&
          selectedRole === "owner") ||
        selectedRole === "customer"
      ) {
        //console.log("sakib");
        const response = await axios.post(
          "https://backend.asholproperty.com/ownercustomers",
          {
            email: values.email || "",
            password: values.password || "",
            fullName: values.fullName || "",
            date_of_birth: values.date_of_birth || "",
            role: selectedRole,
            nidNumber: values.nidNumber || "",
            gender: values.gender || "male",
            profession: values.profession || "service holder",
            mobile_number: values.mobile_number || "",
            latLong: values.latLong || "",
            division: "dhaka",
            roadNo: values.roadNo || "",
            houseNo: values.houseNo || "",
            local_address: values.local_address || "",
            membershipType: values.membershipType || "free",
            runnerId: values.runnerId || "",
            areaId: values.areaId || "",
            subAreaId: values.subAreaId || "",
            profilePhotoURL: profilePhotoResponse.data?.fileName || "",
            nidURL: nidPhotoResponse.data?.fileName || "",
            signatureURL: signPhotoResponse.data?.fileName || "",
          }
        );

        const token = response.data?.token;
        localStorage.setItem("token", token);

        if (response.data.error === "Mobile number or email already exist")
          toast.error("Mobile number or email already used!");
        else {
          toast.success("Signup successful");
          router.push(`/otp/${values.mobile_number}`);
        }
      }
    } catch (error) {
      toast.error(error.response.data?.error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="authentication-box"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      <NavbarFive />
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center">
          <Col
            md="6"
            className="d-none d-md-flex justify-content-center align-items-center p-0"
          >
            <img
              src="/assets/images/signup.jpg"
              alt="Image"
              className="img-fluid"
              style={{
                minWidth: "100%",
                maxHeight: "100vh",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col
            md="6"
            className="signup-padding"
            style={{ overflow: "scroll", maxHeight: "100vh", padding: "50px" }}
          >
            <Card className="card h-100 border-0">
              <CardBody className="card-body d-flex flex-column">
                <div className="title-3 text-start mb-4">
                  <h2>Sign up</h2>
                </div>
                <div className="form-group flex-column">
                  <div>
                    <UserCheck size={20} style={{ marginRight: "8px" }} />
                    <label>Resgister As</label>
                  </div>
                  <select
                    id="role"
                    as="select"
                    name="role"
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                      padding: "7px",
                      border: "1px solid rgba(0,0,0,.1)",
                    }}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    value={selectedRole}
                  >
                    <option value="customer">Customer</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
                {selectedRole === "owner" ? (
                  <OwnerForm
                    state={state}
                    setState={setState}
                    handleSubmit={handleSubmit}
                    CheckAge={CheckAge}
                  />
                ) : (
                  <CustomerForm
                    state={state}
                    setState={setState}
                    handleSubmit={handleSubmit}
                    CheckAge={CheckAge}
                  />
                )}
              </CardBody>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                Already have an account?{" "}
                <Link href="/login">
                  <span style={{ color: "blue", marginLeft: "5px" }}>
                    {" "}
                    Log in
                  </span>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <FooterThree />
    </div>
  );
};

export default SignUp;

SignUp.getLayout = function getLayout(SignUp) {
  return <>{SignUp}</>;
};
