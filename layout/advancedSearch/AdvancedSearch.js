/**
 * It's a function that returns a div with a className that is a string that is a concatenation of a
 * few strings.
 * @returns A React component.
 */
import React from "react";
import InputForm from "../../components/home/slider-filter-search/homeElements/InputForm";
import useMobileSize from "../../utils/useMobileSize";

const AdvancedSearch = ({ advancedSearchOpen, setAdvancedSearchOpen, value,getProperties }) => {
  const mobile = useMobileSize();
  
  return (
    <div className={`left-sidebar filter-bottom-content ${advancedSearchOpen ? "d-block open" : "d-none"}  ${!mobile ? "position-absolute" : ""} `}>
      <h6 className='d-lg-none d-block text-end'>
        <a className='close-filter-bottom' onClick={() => setAdvancedSearchOpen(false)}>
          Close filter
        </a>
      </h6>
      <InputForm value={value} lg={4} sm={12} getProperties={getProperties}/>
    </div>
  );
};

export default AdvancedSearch;
