import React, { useEffect, useId, useReducer, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Pagination from "../../../../layout/Pagination";
import Filter from "../../../../layout/sidebarLayout/Filter";
import Header from "../../../../layout/sidebarLayout/Header";
import Sidebar from "../../../../layout/sidebarLayout/Sidebar";
import FilterTag from "../../elements/FilterTag";
import GridLayout from "../../elements/GridLayout";
import { gridReducer, initialGrid } from "./gridReducer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const GridView = ({
  side,
  size,
  gridType,
  listSize,
  mapModal,
  mapView,
  relativeSlider,
  gridBar,
  video,
  tabHeader,
  setMapModal,
  children,
  AdvancedSearchShow,
  infiniteScroll,
  myList,
  home,
}) => {
  const router = useRouter();
  const [value, setValue] = useState();
  const [grid, gridDispatch] = useReducer(gridReducer, initialGrid);
  const [properties, setProperties] = useState();
  const [profileDetail, setProfileDetail] = useState({});
  const [userId, setUserId] = useState();
  const inputFilter = useSelector((state) => state.inputsReducer);
  const [propertiesToDisplay, setPropertiesToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [render, setRender] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // Replace this with your actual total number of pages

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      // Add your logic here to update the current page
      setCurrentPage(pageNumber);
      // You can also perform any other actions here, like fetching new data for the new page.
    }
  };

  useEffect(() => {
    gridDispatch({ type: "gridSize", payload: size });
    gridDispatch({ type: "gridStyle", payload: gridType });
    //console.log('inpitFilter',inputFilter);
  }, [inputFilter]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const id = localStorage.getItem("id");
      //console.log(id);
      // const role = localStorage.getItem("role");
      setUserId(id);
    }
  }, []);

  //this function re-fetch properties when featured button is toggled
  useEffect(() => {
    getProperties();
  }, [setRender, inputFilter.IsFeatured]);

  const getProperties = async () => {
    //console.log("inputFilter", inputFilter);
    try {
      const response = await axios.get(
        "https://backend.asholproperty.com/property-items",
        {
          params: {
            filter: {
              order: inputFilter.sortBy || "updatedAt",
              where: {
                beds: inputFilter.bed !== "" ? inputFilter.bed : null,
                baths: inputFilter.bath !== "" ? inputFilter.bath : null,
                areaId:
                  inputFilter?.area?.id !== "" ? inputFilter?.area?.id : null,
                subareaId:
                  inputFilter?.subArea?.id !== ""
                    ? inputFilter?.subArea?.id
                    : null,
                property_type:
                  inputFilter?.propertyType !== ""
                    ? inputFilter?.propertyType
                    : null,
                price: {
                  between: inputFilter.price,
                },
                area_size: {
                  between: inputFilter.size,
                },
                sublet:
                  inputFilter.isSublet !== "" ? inputFilter.isSublet : null,
                purpose:
                  inputFilter.propertyPurpose !== ""
                    ? inputFilter.propertyPurpose
                    : null,
                condition:
                  inputFilter.condition !== "" ? inputFilter.condition : null,
                status: "Live" || "live",
                IsFeatured: inputFilter.IsFeatured,
              },
            },
          },
        }
      );
      console.log(response.data);
      setProperties(response.data);
      setTotalPages(Math.ceil(response.data.length / 6));
    } catch (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    const propertiesPerPage = 6;
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage - 1;
    const display = properties?.slice(startIndex, endIndex + 1);
    setPropertiesToDisplay(display);
  }, [currentPage, properties]);

  return (
    <section
      className={`property-section  ${
        mapView && mapModal === "view" ? "section-sm" : ""
      }  ${relativeSlider ? "property-list-thumbnail" : ""}`}
    >
      <Container>
        <Row className=" ratio_63">
          {side && !home && (
            <Sidebar side={side} col="4">
              <Filter
                value={value}
                sm={12}
                lg={12}
                userId={userId}
                getProperties={getProperties}
              />
            </Sidebar>
          )}

          <Col
            xl={side ? "8" : ""}
            lg={side ? "7" : ""}
            className={`${
              relativeSlider ? "property-grid-3" : "property-grid-2"
            }  property-grid-slider`}
          >
            <Header
              getProperties={getProperties}
              grid={grid}
              gridDispatch={gridDispatch}
              title={"Property Listing"}
              mapModal={mapModal}
              gridBar={gridBar}
              tabHeader={tabHeader}
              AdvancedSearchShow={AdvancedSearchShow}
              value={value}
              setMapModal={setMapModal}
              properties={properties}
              inputFilter={inputFilter}
              setRender={setRender}
              render={render}
            />

            {children}
            <div
              className={`property-wrapper-grid ${
                grid.gridStyle ? "list-view" : ""
              }`}
            >
              {properties?.length === 0 ? (
                <div style={{ color: "#00B160" }}>No Property Found!</div>
              ) : (
                <GridLayout
                  properties={propertiesToDisplay}
                  grid={grid}
                  myList={myList}
                  value={value}
                  listSize={listSize}
                  relativeSlider={relativeSlider}
                  video={video}
                  gridDispatch={gridDispatch}
                  infiniteScroll={infiniteScroll}
                />
              )}
            </div>
            {infiniteScroll ? (
              <a
                className="btn btn-solid btn-flat load-more"
                onClick={() =>
                  gridDispatch({ type: "toPage", payload: grid.toPage + 0.5 })
                }
              >
                load more
              </a>
            ) : (
              properties?.length >= 6 &&
              properties?.length !== 0 &&
              !home && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default GridView;
