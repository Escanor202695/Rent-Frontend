// RangeInputFields.js (custom component)
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const RangeInputFields = ({ label, min, max, step, onChange,filter }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const router = useRouter();

  const isHomePage = router.pathname === '/home';
  const inputStyle = {
    backgroundColor: isHomePage ? 'transparent' : null,
    color: isHomePage ? '#D8D8D7' : '#878787',
    border: isHomePage ? '1px solid #696061' : '1px solid #EEEEEE',
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setMinValue(min);
    setMaxValue(max);
  }, [min, max]);

  
  useEffect(() => {
    if (minValue !== min || maxValue !== max) {
      onChange(minValue, maxValue);
    }
  }, [minValue, maxValue, min, max, onChange]);

  const handleMinChange = (event) => {
    const newMinValue = parseFloat(event.target.value);
    setMinValue(newMinValue);
    onChange(newMinValue, maxValue);
    if (newMinValue !== 0 || maxValue !== 0) {
      // Check if both min and max are not 0
      dispatch({ type: filter, payload: [newMinValue, maxValue] });
    }
  };

  const handleMaxChange = (event) => {
    const newMaxValue = parseFloat(event.target.value);
    setMaxValue(newMaxValue);
    onChange(minValue, newMaxValue);
    if (minValue !== 0 || newMaxValue !== 0) {
      // Check if both min and max are not 0
      dispatch({ type: filter, payload: [minValue, newMaxValue] });
    }
  };

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="d-flex justify-content-between">
        <input
          type="number"
          className="form-control"
          placeholder="Min"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          style={inputStyle}
        />
        <span className="mx-2 text-white" style={{color:"#D8D8D7"}}>-</span>
        <input
          type="number"
          className="form-control"
          placeholder="Max"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          style={inputStyle}
        />
      </div>
    </div>
  );
};

export default RangeInputFields;
