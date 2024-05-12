import "swiper/swiper-bundle.css";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Img from "../../../utils/BackgroundImageRatio";


const GallerySlider = ({ images }) => {
  const [bigImageIndex, setBigImageIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSmallSliderClick = (index) => {
    setBigImageIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <>
      <div
        className="big-image-container"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <img
          src={
            images &&
            `https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${images[bigImageIndex]}`
          }
          className="big-img"
        />
      </div>
      <Swiper
        ref={swiperRef}
        className="gallery-slider"
        slidesPerView="auto"
        onSlideChange={(swiper) => setBigImageIndex(swiper.activeIndex)}
      >
        {images &&
          images.map((image, i) => (
            <SwiperSlide
              onClick={() => setBigImageIndex(i)}
              key={i}
              style={{
                height: "120px",
                width: "auto",
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                cursor:'pointer'
              }}
              className={bigImageIndex !== i ? "not-active" : "active-image"}
            >
              <img
                src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${image}`}
                className=""
                style={{ height: "100%", width: "auto" }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default GallerySlider;
