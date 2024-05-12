/**
 * It's a functional component that renders a div with a className of 'advance-card' and a child
 * component called InputForm
 * @returns A component that is a div with a class of advance-card. Inside the div is a h6 tag with the
 * text filter. Inside the div is an InputForm component.
 */
import React from "react";
import InputForm from "../../components/home/slider-filter-search/homeElements/InputForm";

const Filter = ({ value,sm,lg,getProperties,userId }) => {
  return (
    <>
      <div className="advance-card">
        <h6>filter</h6>
        <InputForm
          label={false}
          value={value}
          sm={sm}
          lg={lg}
          userId={userId}
          getProperties={getProperties}
          reset={true}
        />
  
      </div>
    </>
  );
};

export default Filter;
