/**
 * It maps through the RightNavMenuItem array and returns the appropriate component based on the title
 * of the object
 * @returns A list of items that are being mapped over.
 */
import Link from "next/link";
import React, { Fragment } from "react";
import { Menu, User, Home } from "react-feather";
import { MainNavMenuItems } from "../../../data/menu";


const MenuNav = () => {
  return (
    <ul className="header-right">
      <li className="right-menu">
        <ul className="nav-menu">
          {MainNavMenuItems.map((value, i) => (
            <Fragment key={i}>
              {value.title === "MYLISTING" && (
                <li className="dropdown">
                  <Link href="/pages/other-pages/login">MY LISTING</Link>
                </li>
              )}
              {value.title === "RENT_MANAGEMENT" && (
                <li className="dropdown">
                  <Link href="/pages/other-pages/login">RENT MANAGEMENT</Link>
                </li>
              )}{" "}
              {value.title === "PROPERTIES" && (
                <li className="dropdown">
                  <Link href="/pages/other-pages/login">PROPERTIES</Link>
                </li>
              )}{" "}
              {value.title === "ABOUT_US" && (
                <li className="dropdown">
                  <Link href="/pages/other-pages/login">ABOUT US</Link>
                </li>
              )}
              {value.title === "CONTACT" && (
                <li className="dropdown">
                  <Link href="/pages/other-pages/login">CONTACT</Link>
                </li>
              )}
              {value.title === "HOME" && (
                <li className="dropdown">
                  <Link href="/pages/other-pages/login">HOME</Link>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default MenuNav;
