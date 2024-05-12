import React, { Fragment, useEffect, useState } from "react";
import { User, LogOut, LogIn } from "react-feather";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";

const RightNav = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    // Remove the token from localStorage
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <ul className="header-right" style={{ margin: "0px" }}>
      <li
        className="right-menu"
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        <ul className="nav-menu" style={{ padding: "0px" }}>
          <Fragment>
            {user && (
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle nav caret>
                  <User style={{ color: "#566267" }} className="user-icon" />
                </DropdownToggle>
                <DropdownMenu className="custom-dropdown-menu">
                  {user?.id && (
                    <DropdownItem onClick={handleLogout}>
                      <a href="/login" className="nav-link">
                        <LogOut className="me-2 nav-icon" style={{ width: "15px" }} />
                        Logout
                      </a>
                    </DropdownItem>
                  )}
                  {!user?.id && (
                    <DropdownItem>
                      <a href="/login" className="nav-link">
                        <LogIn className="me-2 nav-icon" />
                        Log In
                      </a>
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            )}
          </Fragment>
        </ul>
      </li>
    </ul>
  );
};

export default RightNav;
