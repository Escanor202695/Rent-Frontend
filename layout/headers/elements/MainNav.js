import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import DropdownMenus from "./mainNavComponents/DropdownMenus";

const MainNav = ({ center }) => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [isOpen, setIsOpen] = useState();
  const [isOpenChild, setIsOpenChild] = useState();
  const [isOpenNestedChild, setIsOpenNestedChild] = useState();
  const [profileData, setProfileData] = useState();
  const [user, setUser] = useState({
    id: null,
    role: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      setUser({ id, role });
      profileDetails(id);
    }
  }, []);

  const profileDetails = async (id) => {
    try {
      const response = await fetch(
        `https://backend.asholproperty.com/ownercustomers/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        console.error("Failed to fetch profile data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <nav>
      <div className="main-navbar">
        <div id="mainnav">
          <div className="toggle-nav">
            <i
              className="fa fa-bars sidebar-bar"
              onClick={() => setOpenNavbar(true)}
            ></i>
          </div>
          <ul className={`nav-menu ${openNavbar ? "open" : ""}`}>
            <li className="back-btn">
              <div className="mobile-back text-end">
                <span onClick={() => setOpenNavbar(false)}>Back</span>
                <i aria-hidden="true" className="fa fa-angle-right ps-2"></i>
              </div>
            </li>

            <Fragment>
              <li className="dropdown">
                <Link href="/home">HOME</Link>
              </li>

              {user?.role === "owner" && (
                <li className="dropdown">
                  <Link href="/my-listing">MY LISTING</Link>
                </li>
              )}
              {user?.role === "owner" && (
                <DropdownMenus
                  navTitle={{
                    title: "RENT MANAGEMENT",
                    type: "sub",
                    children: [
                      {
                        title: "Dashboard",
                        type: "link",
                        path: "/dashboard",
                      },
                      {
                        title: "Assets",
                        type: "link",
                        path: "/assets",
                      },
                    ],
                  }}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  isOpenChild={isOpenChild}
                  setIsOpenChild={setIsOpenChild}
                  isOpenNestedChild={isOpenNestedChild}
                  setIsOpenNestedChild={setIsOpenNestedChild}
                  membership={profileData?.membershipType}
                />
              )}
              <li className="dropdown">
                <Link href="/properties">PROPERTIES</Link>
              </li>
              {user?.role === "customer" && (
                <li className="dropdown">
                  <Link href="/favourites">FAVOURITES</Link>
                </li>
              )}

              <li className="dropdown">
                <Link href="/about">ABOUT US</Link>
              </li>

              {user?.role && (
                <li className="dropdown">
                  <Link href="/profile">PROFILE</Link>
                </li>
              )}
              {user?.role !== "owner" && (
                <li className="dropdown">
                  <Link href="/FAQ">FAQ</Link>
                </li>
              )}
              <li className="dropdown">
                <Link href="/contact">Contact</Link>
              </li>
            </Fragment>
          </ul>

          {center && (
            <div className="brand-logo">
              <Link href="/home/slider-filter-search">
                <img
                  src="/assets/images/logo/4.png"
                  alt=""
                  className="img-fluid for-light"
                />
                <img
                  src="/assets/images/logo/9.png"
                  alt=""
                  className="img-fluid for-dark"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
