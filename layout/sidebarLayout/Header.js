/**
 * It renders a header with a title, a dropdown, and a grid/list toggle
 * @returns The return statement is used to return a value from a function.
 */
import React, { useEffect, useState } from "react";
import { AlignCenter, Grid, List } from "react-feather";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import AdvancedSearch from "../advancedSearch/AdvancedSearch";
import useMobileSize from "../../utils/useMobileSize";

const Header = ({
  properties,
  grid,
  mapView,
  mapModal,
  gridBar,
  tabHeader,
  title,
  AdvancedSearchShow,
  productCount,
  setMapModal,
  gridDispatch,
  getProperties,
  setRender,
  render,
  inputFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const { sortBy, propertyStatus, IsFeatured } = useSelector(
    (state) => state.inputsReducer
  );

  // useEffect(()=>{
  //   setRender(true);
  // },[IsFeatured])

  const sortingOptions = {
    "updatedAt": "Sort by Newest",
    "updatedAt DESC": "Sort by Oldest",
    "price DESC": "High to Low Price",
    "price ASC": "Low to High Price",
    // Add more options as needed
  };

  const mobileSize = useMobileSize("AdvancedSearch");
  const dispatch = useDispatch();
  return (
    <div className="filter-panel">
      <div className="top-panel">
        {tabHeader ? (
          <div className="filters respon-filter-content filter-button-group">
            <ul>
              <li
                className={
                  propertyStatus === "Property Status" ||
                  !propertyStatus?.length
                    ? "active"
                    : ""
                }
                onClick={() =>
                  dispatch({
                    type: "propertyStatus",
                    payload: "Property Status",
                  })
                }
              >
                <span>All Property</span>
              </li>
              <li
                className={propertyStatus === "For Sale" ? "active" : ""}
                onClick={() =>
                  dispatch({ type: "propertyStatus", payload: "For Sale" })
                }
              >
                <span>For Sale</span>
              </li>
              <li
                className={propertyStatus === "For Rent" ? "active" : ""}
                onClick={() =>
                  dispatch({ type: "propertyStatus", payload: "For Rent" })
                }
              >
                <span>For rent</span>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h2>{title}</h2>
            <span className="show-result" style={{ color: "#01b060" }}>
              {properties?.length} properties found
            </span>
          </div>
        )}

        <ul className="grid-list-filter d-flex p-0">
          {mapModal && (
            <li>
              <a
                onClick={() => {
                  setMapModal(!mapModalOpen);
                  setMapModalOpen(!mapModalOpen);
                }}
              >
                View on map
                <span className="arrow-define">Click to view</span>
              </a>
            </li>
          )}

          <li >
          <Dropdown isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
            <DropdownToggle>
              <span className="font-roboto">{sortingOptions[sortBy] || "Sort by Newest"}</span>{" "}
              <i className="fas fa-angle-down ms-lg-3"></i>
            </DropdownToggle>
            <DropdownMenu className=" text-start font-roboto">
              {Object.keys(sortingOptions).map((optionValue) => (
                <DropdownItem
                  key={optionValue}
                  onClick={() =>
                    dispatch({ type: "sortBy", payload: optionValue })
                  }
                >
                  {sortingOptions[optionValue]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </li>

          <li>
            {(AdvancedSearchShow || mobileSize) && (
              <div className="filter-bottom-title">
                <h6
                  className="mb-0 font-roboto"
                  style={{padding:"4px 0",fontSize:"16px"}}
                  onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}
                >
                  Advance search
                </h6>
              </div>
            )}
          </li>

          <li>
            <AdvancedSearch
              setAdvancedSearchOpen={setAdvancedSearchOpen}
              advancedSearchOpen={advancedSearchOpen}
              getProperties={getProperties}
            />
          </li>

          <li>
            <div
              style={{
                cursor: "pointer",
                padding: "8px 20px",
                border: "1px solid",
                backgroundColor: IsFeatured === "Yes" ? "#05AF60" : "white",
                borderColor:
                  IsFeatured === "Yes" ? "#05AF60" : "rgba(0,0,0,.08)",
                borderRadius: "4px",
                color: IsFeatured === "Yes" ? "white" : "#586166",
                fontWeight: "500",
                fontSize: "16px",
              }}
              onClick={() => {
                dispatch({
                  type: "IsFeatured",
                  payload: IsFeatured === "Yes" ? null : "Yes",
                });
                setRender(!render);
              }}
              className="font-roboto"
            >
              Only Freatured
            </div>
          </li>



          {/*gridbar hidden*/}
          {!gridBar && (
            <>
              <li
                className={`collection-grid-view ${
                  mapView ? "d-none" : "d-block"
                }`}
                style={{
                  opacity: `${grid?.gridStyle === "grid-view" ? "1" : "0"}`,
                }}
              >
                <ul>
                  <li>
                    <img
                      src="/assets/images/icon/2.png"
                      alt=""
                      className="product-2-layout-view"
                      onClick={() =>
                        gridDispatch({ type: "gridSize", payload: 2 })
                      }
                    />
                  </li>
                  <li>
                    <img
                      src="/assets/images/icon/3.png"
                      alt=""
                      className="product-3-layout-view"
                      onClick={() =>
                        gridDispatch({ type: "gridSize", payload: 3 })
                      }
                    />
                  </li>
                  <li>
                    <img
                      src="/assets/images/icon/4.png"
                      alt=""
                      className="product-4-layout-view"
                      onClick={() =>
                        gridDispatch({ type: "gridSize", payload: 4 })
                      }
                    />
                  </li>
                </ul>
              </li>
              <li
                className={`grid-btn ${
                  grid?.gridStyle === "grid-view" && "active"
                }`}
              >
                <a
                  className="grid-layout-view"
                  onClick={() =>
                    gridDispatch({ type: "gridStyle", payload: "grid-view" })
                  }
                >
                  <Grid />
                </a>
              </li>
              <li
                className={`list-btn ${
                  grid?.gridStyle === "list-view" && "active"
                }`}
              >
                <a
                  className="list-layout-view"
                  onClick={() =>
                    gridDispatch({ type: "gridStyle", payload: "list-view" })
                  }
                >
                  <List />
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
