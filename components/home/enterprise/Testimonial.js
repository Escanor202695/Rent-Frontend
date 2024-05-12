/**
 * It takes in an array of objects and returns a Slider component with a bunch of divs inside it
 * @returns The return value is the value of the last expression evaluated inside the function.
 */
import React,{useState,useEffect} from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import {
  CEOofDesees,
  docuts,
  WhatPeopleSay,
} from "../../../constValues/constValues";
import { testimonial1 } from "../../../data/slickSlider";
import NoSsr from "../../../utils/NoSsr";

const TestimonialSection = ({ value }) => {
  const [id, setId] = useState();
  const [role,setRole]=useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
       const role =localStorage.getItem("role");
      setId(id);
      setRole(role);
    }
  }, []);

  const testimonials1 = [
    "Finding the perfect house was such a hassle until I came across Ashol Property LTD. Their online rental management system made the whole process incredibly convenient and stress-free. They truly understood my requirements and helped me find my dream house effortlessly. I highly recommend their services to anyone in search of their ideal home.",
    "Working with Ashol Property LTD was an absolute game-changer for me. Their dedication to customer satisfaction is evident in every step of the process. The online rental management system they offer is intuitive and efficient, making house hunting a breeze. Thanks to their assistance, I'm now happily settled in a home that ticks all the boxes. Thank you, Ashol Property LTD!",
    "I can't thank Ashol Property LTD enough for their exceptional services. As a busy professional, I had limited time to search for a new rental property. Their online platform streamlined the entire process, allowing me to explore various options from the comfort of my home. Their attention to detail and commitment to finding the right fit for me is truly commendable. I'm thrilled with my new home!",
    "Ashol Property LTD turned my house-hunting experience into a delight. Their online rental management system is a game-changer in the real estate industry. The personalized approach they offer ensured that my preferences were taken into consideration, and they went above and beyond to secure a fantastic rental for me. If you're looking for professionalism, convenience, and excellent service, look no further."
]

const testimonials2= [
  "I've been a property owner in Dhaka for years, and partnering with Ashol Property LTD has been a game-changer. Their tenant acquisition service has consistently brought me responsible and reliable tenants who take care of my property as if it were their own. Their meticulous screening process and dedication to matching the right tenants have saved me time and minimized vacancies. Ashol Property LTD is my trusted ally in the rental market.",
  "Finding trustworthy tenants was always a concern for me as a property owner in Dhaka. However, since I started working with Ashol Property LTD, those worries have become a thing of the past. Their expertise in tenant acquisition and their commitment to understanding my preferences have resulted in a consistent stream of great tenants for my properties. I highly recommend Ashol Property LTD to fellow property owners seeking a reliable partner.",
  "Ashol Property LTD has been my go-to solution for tenant acquisition in Dhaka. Their services have exceeded my expectations in every way. From their thorough background checks to their ability to match tenants with the right properties, they've transformed my rental experience. The team's professionalism and dedication to ensuring a seamless owner-tenant relationship make Ashol Property LTD an invaluable asset for property owners.",
  "I've entrusted Ashol Property LTD with the task of bringing in tenants for my rental properties, and they've consistently delivered exceptional results. Their process is thorough, efficient, and tailored to the unique dynamics of the Dhaka rental market. They not only understand my requirements as a property owner but also prioritize the satisfaction of both owners and tenants. If you're looking for a hassle-free tenant acquisition solution, look no further."
]


  
  return (
    <section className="testimonial-style-1">
      <Container>
        <Row>
          <Col>
            <div className="title-2">
              <h2>{WhatPeopleSay}</h2>
              <p>{docuts}</p>
            </div>
            <div className="slick-between">
              <NoSsr>
                <Slider
                  className="testimonial-1 dot-gradient"
                  {...testimonial1}
                >
                  {role==="owner" &&
                    testimonials2.map((data, i) => (
                      <div key={i}>
                        <div className="pepole-comment">
                          <div className="client-msg">
                            <span className="quote">
                              <img
                                src="/assets/images/testimonial/quote.png"
                                alt=""
                              />
                            </span>
                            <p>{data}</p>
                          </div>
                 
                        </div>
                      </div>
                    ))}
                  {role!=="owner" &&
                    testimonials1.map((data, i) => (
                      <div key={i}>
                        <div className="pepole-comment">
                          <div className="client-msg">
                            <span className="quote">
                              <img
                                src="/assets/images/testimonial/quote.png"
                                alt=""
                              />
                            </span>
                            <p>{data}</p>
                          </div>
                 
                        </div>
                      </div>
                    ))}
                </Slider>
              </NoSsr>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialSection;
