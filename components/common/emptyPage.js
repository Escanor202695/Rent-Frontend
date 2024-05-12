import React from "react";

function emptyPage(props) {
  return (
    <div
      style={{
        width: "100vw",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2 style={{fontWeight:"bold",}}>No {props.item} Found!</h2>
      <img
        src="/assets/images/empty.js"
        alt="Empty Image"
        style={{ maxWidth: "300px", height: "auto" }}
      />
    </div>
  );
}

export default emptyPage;
