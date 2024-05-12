import React, { useEffect } from "react";
import Slider from "react-slick";
import { propertySlider } from "../../data/slickSlider";
import Img from "../../utils/BackgroundImageRatio";
import NoSsr from "../../utils/NoSsr";

const ImageSlider = ({ images }) => {
  // useEffect(() => {
  //   //console.log("images", images);
  // }, [images]);

  return (
    <NoSsr>
      <Slider className="property-slider" {...propertySlider}>
        {images?.map((data, i) => (
          <div key={i}>
            <div>
              <Img
                src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${data}`}
                className="bg-img"
              />
            </div>
          </div>
        ))}
      </Slider>
    </NoSsr>
  );
};

export default ImageSlider;
