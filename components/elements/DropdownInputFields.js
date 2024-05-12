import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RangeInputFields from "../elements/RangeInputFields";
import {
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
  Row,
} from "reactstrap";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const DropdownInputFields = ({
  label,
  lg,
  sm,
  getProperties,
  reset = true,
}) => {
  const dispatch = useDispatch();
  const inputFilter = useSelector((state) => state.inputsReducer);
  const router = useRouter();
  const [flag, setFlag] = useState(false);

  const handleReset = () => {
    // Clear all the filters
    setChangedFilter({});
    dispatch({ type: "propertyPurpose", payload: "" });
    dispatch({ type: "propertyType", payload: "" });
    dispatch({ type: "bed", payload: "" });
    dispatch({ type: "bath", payload: "" });
    dispatch({ type: "condition", payload: "" });
    dispatch({ type: "isSublet", payload: "" });
    dispatch({ type: "area", payload: "" });
    dispatch({ type: "subArea", payload: "" });
    dispatch({ type: "price", payload: [] });
    dispatch({ type: "size", payload: [] });
    setChangedFilter({});

    // Fetch initial areas and reset state
    fetchAreas();

    setState({
      areaId: "",
      subareaId: "",
      areaArray: [],
      subareaArray: [],
    });
  };

  const [isOpen, setIsOpen] = useState({
    propertyPurpose: false,
    propertyType: false,
    bed: false,
    bath: false,
    condition: false,
    isSublet: false,
    area: false,
    subArea: false,
  });

  const [state, setState] = useState({
    areaId: "",
    subareaId: "",
    areaArray: [],
    subareaArray: [],
  });

  // Local state to track changes before submitting
  const [changedFilter, setChangedFilter] = useState({});

  const toggleDropdown = (fieldName) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const handleDropdownSelect = (fieldName, option) => {
    setChangedFilter((prevFilters) => ({
      ...prevFilters,
      [fieldName]: option,
    }));
  };

  const handleAreaChange = (selectedArea) => {
    if (selectedArea) {
      fetchSubAreas(selectedArea.id);
      dispatch({ type: "subArea", payload: null });
      setChangedFilter((prevFilters) => ({
        ...prevFilters,
        area: selectedArea, // Update the area
        subArea: "", // Clear the subArea
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        subareaArray: [],
      }));
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await axios.get(
        "https://backend.asholproperty.com/areas"
      );
      setState((prevState) => ({
        ...prevState,
        areaArray: response.data,
      }));
    } catch (error) {
      //console.log(error);
    }
  };

  // fetch areas data
  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchSubAreas = async (selectedAreaId) => {
    try {
      const response = await axios.get(
        `https://backend.asholproperty.com/areas/${selectedAreaId}/sub-areas`
      );
      setState((prevState) => ({
        ...prevState,
        subareaArray: response.data,
      }));
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (state.areaId) {
      fetchSubAreas(state.areaId);
    } else {
      fetchSubAreas(inputFilter?.area?.id);
    }
  }, [state.areaId]);

  const handleSubmit = async () => {
    // Dispatch each filter individually
    Object.entries(changedFilter).forEach(([key, value]) => {
      dispatch({ type: key, payload: value === "All" ? "" : value });
    });
    setFlag(true);
    router.push('/properties');
  };

  useEffect(() => {
    if (getProperties) getProperties();

    setFlag(false);
  }, [flag]);

  return (
    <>
      <Col lg={6}>
        <div className="form-group">
          {label && <label>Property Purpose</label>}
          <Dropdown
            isOpen={isOpen.propertyPurpose}
            toggle={() => toggleDropdown("propertyPurpose")}
          >
            <DropdownToggle className="font-rubik" caret>
              {changedFilter.propertyPurpose ||
                inputFilter.propertyPurpose ||
                "Purpose"}
              <i className="fas fa-angle-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              {["All", "Rent", "Sale", "Lease"].map((option, i) => (
                <DropdownItem
                  key={i}
                  onClick={() =>
                    handleDropdownSelect("propertyPurpose", option)
                  }
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>

      <Col lg="6">
        <div className="form-group">
          {label && <label>Type</label>}
          <Dropdown
            isOpen={isOpen.propertyType}
            toggle={() => toggleDropdown("propertyType")}
          >
            <DropdownToggle className="font-rubik" caret>
              {changedFilter.propertyType || inputFilter.propertyType || "Type"}
              <i className="fas fa-angle-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              {[
                "All",
                "Apartment/Flat",
                "Duplex",
                "Pent House",
                "Commercial Flat",
                "Commercial Floor",
                "Plot",
                "Land",
              ].map((option, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => handleDropdownSelect("propertyType", option)}
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>

      <Col lg="6">
        <div className="form-group">
          {label && <label>Bed</label>}
          <Dropdown isOpen={isOpen.bed} toggle={() => toggleDropdown("bed")}>
            <DropdownToggle className="font-rubik" caret>
              {changedFilter.bed || inputFilter.bed || "Bed"}
              <i className="fas fa-angle-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              {["All", 1, 2, 3, 4].map((option, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => handleDropdownSelect("bed", option)}
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>

      <Col lg="6">
        <div className="form-group">
          {label && <label>Bath</label>}
          <Dropdown isOpen={isOpen.bath} toggle={() => toggleDropdown("bath")}>
            <DropdownToggle className="font-rubik" caret>
              {changedFilter.bath || inputFilter.bath || "Bath"}
              <i className="fas fa-angle-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              {["All", 1, 2, 3, 4].map((option, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => handleDropdownSelect("bath", option)}
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>

      <Col lg="6">
        <div className="form-group">
          {label && <label>Condition</label>}
          <Dropdown
            isOpen={isOpen.condition}
            toggle={() => toggleDropdown("condition")}
          >
            <DropdownToggle className="font-rubik" caret>
              {changedFilter.condition || inputFilter.condition || "Condition"}
              <i className="fas fa-angle-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              {["All", "Brand New", "Freshed", "Under Construction"].map(
                (option, i) => (
                  <DropdownItem
                    key={i}
                    onClick={() => handleDropdownSelect("condition", option)}
                  >
                    {option}
                  </DropdownItem>
                )
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>

      <Col lg="6">
        <div className="form-group">
          {label && <label>Sublet</label>}
          <Dropdown
            isOpen={isOpen.isSublet}
            toggle={() => toggleDropdown("isSublet")}
          >
            <DropdownToggle className="font-rubik" caret>
              {changedFilter.isSublet || inputFilter.isSublet || "Sublet"}
              <i className="fas fa-angle-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              {["All", "Yes", "No"].map((option, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => handleDropdownSelect("isSublet", option)}
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>
      <Col lg="6" sm={sm || ""}>
        <div className="form-group">
          {label && <label>Area</label>}
          <Dropdown isOpen={isOpen.area} toggle={() => toggleDropdown("area")}>
            <DropdownToggle className="font-rubik" caret>
              {changedFilter.area?.AreaName ||
                inputFilter.area?.AreaName ||
                "Area"}
              <i className="fas fa-angle-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  handleAreaChange([]);
                  dispatch({ type: "area", payload: [] });
                  setChangedFilter((prevFilters) => ({
                    ...prevFilters,
                    subArea: "",
                    area: "",
                  }));
                }}
              >
                All
              </DropdownItem>
              {state.areaArray.map((area, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => {
                    handleAreaChange(area);
                    dispatch({ type: "area", payload: area });
                    setChangedFilter((prevFilters) => ({
                      ...prevFilters,
                      subArea: "",
                      area: area,
                    }));
                  }}
                >
                  {area.AreaName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>

      <Col lg="6" sm={sm || ""}>
        <div className="form-group">
          {label && <label>Sub Area</label>}
          <Dropdown
            isOpen={isOpen.subArea}
            toggle={() =>
              (changedFilter?.area || inputFilter?.area) &&
              toggleDropdown("subArea")
            }
            onClick={() => {
              const area = changedFilter?.area || inputFilter?.area;

              if (!area) return toast?.info("Select Area First!");
            }}
          >
            <DropdownToggle className="font-rubik" caret>
              {changedFilter.subArea?.subAreaName ||
                inputFilter.subArea?.subAreaName ||
                "Sub Area"}
              <i className="fas fa-angle-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  dispatch({ type: "subArea", payload: [] });
                  handleDropdownSelect("subArea", []);
                }}
              >
                All
              </DropdownItem>
              {state.subareaArray.map((subArea, i) => (
                <DropdownItem
                  key={i}
                  onClick={() => {
                    dispatch({ type: "subArea", payload: subArea });
                    handleDropdownSelect("subArea", subArea);
                  }}
                >
                  {subArea.subAreaName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Col>

      <RangeInputFields
        label="Price Range"
        min={0}
        max={100000}
        step={100}
        onChange={(min, max) => {
          setChangedFilter((prevState) => ({
            ...prevState,
            price: [min, max],
          }));
        }}
        value={inputFilter.price}
        setChangedFilter={setChangedFilter}
        changedFilter={changedFilter}
        filter="price"
      />
      <RangeInputFields
        label="Size (Sq Feet)"
        min={0}
        max={3000}
        step={100}
        onChange={(min, max) => {
          setChangedFilter((prevState) => ({
            ...prevState,
            size: [min, max],
          }));
        }}
        value={inputFilter.size}
        setChangedFilter={setChangedFilter}
        changedFilter={changedFilter}
        filter="size"
      />

      <div className="d-flex justify-content-between">
        <Button
          className="btn btn-gradient mt-4"
          style={{ width: "150px" }}
          onClick={handleSubmit}
        >
          Search
        </Button>

        {reset && (
          <Button
            className="btn btn-dashed mt-4"
            style={{ width: "150px", borderColor: "rgba(0,0,0,.5)" }}
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
      </div>
    </>
  );
};

export { DropdownInputFields };
