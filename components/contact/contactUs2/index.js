/**
 * It returns a JSX element that contains two other components
 * @returns A React component
 */
import React from "react";
import DownloadAppSection from "./DownloadApp";
import GetInTouchSection from "./GetInTouch";

const BodyContent = () => {
  return (
    <>
      <GetInTouchSection />
      <DownloadAppSection />
    </>
  );
};

export default BodyContent;
