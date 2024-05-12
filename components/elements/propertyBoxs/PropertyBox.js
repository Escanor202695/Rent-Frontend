import Link from "next/link";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import ImageSlider from "../ImageSlider";
import ThumbnailSlider from "../ThumbnailSlider";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartFilledIcon } from "@heroicons/react/solid";
import axios from "axios";

const PropertyBox = ({ data, relativeSlider }) => {
  const [load, setLoad] = useState(true);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  const [id, setId] = useState();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setId(id);
      setRole(role);
    }
    fetchUserFavorites();
  }, []);

  useEffect(() => {
    if (userFavorites?.some((item) => item.propertyId === data.id)) {
      setIsHeartFilled(true);
      console.log("matched");
    } else {
      setIsHeartFilled(false);
      console.log("not-matched", data.id);
    }
  }, [userFavorites]);

  const fetchUserFavorites = async () => {
    try {
      const response = await axios.get(
        "https://backend.asholproperty.com/favourites",
        {
          params: {
            filter: {
              where: {
                ownercustomerId: id,
              },
            },
          },
        }
      );

      console.log("favourites", response.data);
      setUserFavorites(response.data);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  const addToFavorites = async () => {
    try {
      const response = await axios.post(
        `https://backend.asholproperty.com/ownercustomers/${id}/favourites`,
        {
          status: "",
          propertyId: data.id,
        }
      );

      // alert(response.data);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (propertyId) => {
    try {
      await axios.delete(
        `https://backend.asholproperty.com/ownercustomers/${id}/favourites`,
        {
          params: {
            filter: {
              where: {
                propertyId: propertyId,
              },
            },
          },
        }
      );

      // Update the userFavorites state by removing the property
      setUserFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.propertyId !== propertyId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
    if (!isHeartFilled) {
      addToFavorites();
    } else {
      removeFromFavorites();
    }
  };

  return (
    <>
      {!load ? (
        <div className="property-box">
          <div className="property-image position-relative">
            {relativeSlider ? (
              <ThumbnailSlider
                images={data?.images}
                videoData={data?.video}
                video={data?.videoURL}
              />
            ) : (
              <ImageSlider images={data?.images} />
            )}
            <div
              className="position-absolute btn btn-gradient"
              style={{
                top: "10px",
                left: "10px",
                display: data.IsFeatured === "Yes" ? "block" : "none",
              }}
            >
              Featured
            </div>
          </div>

          <div className="property-details pt-2">
            <h2 className="property-title">{data?.title}</h2>
            <p className="font-roboto truncate">{data?.description}</p>
            <ul style={{ padding: "0" }}>
              <li>
                <img
                  src="/assets/images/svg/icon/double-bed.svg"
                  className="img-fluid"
                  alt=""
                />
                Bed : {data?.beds}
              </li>
              <li>
                <img
                  src="/assets/images/svg/icon/bathroom.svg"
                  className="img-fluid"
                  alt=""
                />
                Baths : {data?.baths}
              </li>
              <li>
                <img
                  src="/assets/images/svg/icon/balcony.png"
                  className="img-fluid"
                  alt=""
                />
                Balcony : {data?.balcony}
              </li>
              <li>
                <img
                  src="/assets/images/svg/icon/square-ruler-tool.svg"
                  className="img-fluid ruler-tool"
                  alt=""
                />
                Sq Ft : {data?.area_size}
              </li>
            </ul>
            <div className="property-btn d-flex justify-content-between">
              <div>
                {" "}
                <h6>৳ {data?.price}</h6>
              </div>
              <div>
                {role === "customer" && (
                  <span
                    className={`effect-round like me-4 ${
                      isHeartFilled ? "filled" : ""
                    }`}
                    title="add to favourite"
                    onClick={handleHeartClick}
                    style={{ cursor: "pointer" }}
                  >
                    {isHeartFilled ? (
                      <HeartFilledIcon
                        style={{ width: "30px", color: "#F53539" }}
                      />
                    ) : (
                      <HeartIcon style={{ width: "30px", color: "#05AF60" }} />
                    )}
                  </span>
                )}
                <Link href={`/property/${data?.id}`}>
                  <button type="button" className="btn btn-dashed btn-pill">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ContentLoader className="skeleton-svg">
            {setTimeout(() => {
              setLoad(false);
            }, 1000)}
            <rect className="skeleton-img" />
            <rect className="skeleton-c1" />
            <rect className="skeleton-c2" />
            <rect className="skeleton-c3" />
          </ContentLoader>
        </>
      )}
    </>
  );
};

export default PropertyBox;
