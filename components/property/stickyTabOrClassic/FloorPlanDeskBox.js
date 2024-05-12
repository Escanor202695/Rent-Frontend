import React from "react";
import Img from "../../../utils/BackgroundImageRatio";

const FloorPlanDeskBox = ({image}) => {
  return (
    <div className='desc-box' id='floor_plan'>
      <div className='page-section'>
        <h4 className='content-title'>Floor plan</h4>
        <Img
        src={`https://ap-storage-bucket-01.nyc3.cdn.digitaloceanspaces.com/${image}`}
        className="bg-img"
        alt="property-img"
      />
        
      </div>
    </div>
  );
};

export default FloorPlanDeskBox;
