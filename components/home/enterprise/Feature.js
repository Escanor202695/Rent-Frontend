import React from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { feature2 } from "../../../data/slickSlider";
import NoSsr from "../../../utils/NoSsr";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const FeatureSection = ({ value }) => {
  const inputFilter = useSelector((state) => state.inputsReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  
  const city = [
    {
      name: "Bashundhora",
      img: "/assets/images/bashundhora.jpg",
      id:"83e65f17-a07f-4e38-8d31-cee4060cf6ce"
    },
    {
      name: "Baridhara",
      img: "/assets/images/baridhara.jpg",
      id:"bd2f1b5a-e022-4391-8cca-e978a846ab32"
    },
    {
      name: "Dhanmondi",
      img: "/assets/images/dhanmondi.jpg",
      id:"d78ab2ce-90fa-495d-a091-0bd0c46bb946"
    },
    {
      name: "Mirpur",
      img: "/assets/images/mirpur.jpg",
      id:"83623905-f485-4029-bd31-0bc129276967",
    },
    {
      name: "Gulshan",
      img: "/assets/images/gulshan.jpg",
      id:"23578463-e6da-4977-ab42-033b36665681",
    },
    {
      name: "Uttara",
      img: "/assets/images/uttara.jpg",
      id:"0d8db589-a7ba-4fd3-9b7e-5f94ab69d810",
    },
  ];

  return (
    <section className="feature-section slick-between">
      <Container fluid={true}>
        <Row>
          <Col>
            <div className="title-2 text-white">
              <h2 style={{ color: "black", margin: "0 0 50px 0" }}>
                Popular Areas
              </h2>
            </div>
            <NoSsr>
              <Slider className="feature-2 dot-gradient" {...feature2}>
                {city.map((data, i) => (
                  <div key={i}>
                    <div
                      className="feature-box"
                      onClick={() => {
                        router.push("/properties");
                        dispatch({ type: "area", payload: {id:data.id,AreaName:data.name} });
                      }}
                    >
                      <img
                        src={data.img}
                        className="img-fluid"
                        alt=""
                        style={{ width: "100%", height: "400px" }}
                      />
                      <div className="feature-bottom">
                        <h3>{data.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </NoSsr>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeatureSection;
