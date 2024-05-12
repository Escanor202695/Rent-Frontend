import React from "react";

const VideoSection = ({ videoURL }) => {
  return (
    <section className="breadcrumb-section p-0 property-main">
      <div>
        <iframe
          width="100%"
          height="500"
          src={videoURL}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoSection;

