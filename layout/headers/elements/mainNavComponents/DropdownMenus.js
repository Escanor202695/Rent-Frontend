/**
 * It renders a dropdown menu with nested submenus
 * @returns A dropdown menu with a title and a list of items.
 */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import useMobileSize from "../../../../utils/useMobileSize";
import { useRouter } from "next/router";

const DropdownMenus = ({
  membership,
  navTitle,
  isOpen,
  setIsOpen,
  isOpenChild,
  setIsOpenChild,
  isOpenNestedChild,
  setIsOpenNestedChild,
  icon,
}) => {
  const { t } = useTranslation("common");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleMenuClick = (e) => {
    e.preventDefault();

    if (membership === "free" || membership === "Free") {
      setShowUpgradeModal(true);
    }
    setIsOpen(prevIsOpen => prevIsOpen === navTitle.title ? null : navTitle.title);
    setIsOpenChild(null); // Close child submenu if a different parent item is clicked
  };

  const handleCloseModal = () => {
    setShowUpgradeModal(false);
  };


  const router = useRouter();
  // get window width
  const mobileSize = useMobileSize();
  return (
    <li className="dropdown">
      <Modal isOpen={showUpgradeModal} toggle={handleCloseModal}>
        <ModalHeader>Upgrade Membership</ModalHeader>
        <ModalBody>
          <p>Please upgrade your membership to unlock rent-management.</p>
          <p style={{ fontWeight: "bold" }}>Hotline : 09613825455</p>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-gradient" onClick={handleCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <a onClick={handleMenuClick}>
        {!mobileSize && icon && navTitle.icon}
        {t(navTitle.title)}
        <span className="according-menu">
          {isOpen === navTitle.title ? "-" : "+"}
        </span>
      </a>
      {(membership !== "free" && membership !== "Free") && (
        <ul
          className={`nav-submenu menu-content ${
            mobileSize && isOpen === navTitle.title
              ? "d-block"
              : "d-none d-xl-block"
          }`}
        >
          {navTitle.children?.map((navList, index) => (
            <li key={index}>
              {navList.type === "link" ? (
                <>
                  {navList.path !== router.pathname ? (
                    <Link href={navList.path} className="link">
                      {navList.title}
                      {navList.tag && (
                        <span className="label">{navList.tag}</span>
                      )}
                      {navList.icon && (
                        <span className="icon-trend label">
                          <i className="fas fa-bolt"></i>
                        </span>
                      )}
                    </Link>
                  ) : (
                    <a>
                      {navList.title}
                      {navList.tag && (
                        <span className="label">{navList.tag}</span>
                      )}
                      {navList.icon && (
                        <span className="icon-trend label">
                          <i className="fas fa-bolt"></i>
                        </span>
                      )}
                    </a>
                  )}
                </>
              ) : (
                <>
                  <a
                    className="submenu-title"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpenChild(navList.title);
                      isOpenChild === navList.title && setIsOpenChild();
                    }}
                  >
                    {navList.title}
                    <span className="according-menu">
                      {navList.type === "sub" &&
                        (isOpenChild === navList.title ? "-" : "+")}
                    </span>
                  </a>
                  <ul
                    className={`nav-sub-childmenu level1 ${
                      mobileSize && isOpenChild === navList.title
                        ? "d-block"
                        : ""
                    }`}
                  >
                    {navList.type === "sub" &&
                      navList.children.map((childNavList, index) => (
                        <li key={index}>
                          {childNavList.path ? (
                            <Link
                              href={childNavList.path}
                              className={
                                childNavList.type === "sub"
                                  ? "submenu-title link"
                                  : "link"
                              }
                              onClick={() => {
                                setIsOpenNestedChild(childNavList.title);
                                isOpenNestedChild === childNavList.title &&
                                  setIsOpenNestedChild();
                              }}
                            >
                              {childNavList.title}
                              <span className="according-menu">
                                {childNavList.type === "sub" &&
                                  (isOpenNestedChild === childNavList.title
                                    ? "-"
                                    : "+")}
                              </span>
                            </Link>
                          ) : (
                            <a
                              className={
                                childNavList.type === "sub"
                                  ? "submenu-title"
                                  : ""
                              }
                              onClick={() => {
                                setIsOpenNestedChild(childNavList.title);
                                isOpenNestedChild === childNavList.title &&
                                  setIsOpenNestedChild();
                              }}
                            >
                              {childNavList.title}
                              <span className="according-menu">
                                {childNavList.type === "sub" &&
                                  (isOpenNestedChild === childNavList.title
                                    ? "-"
                                    : "+")}
                              </span>
                            </a>
                          )}
                          {childNavList.type === "sub" && (
                            <ul
                              className={`nav-sub-childmenu submenu-content level2  ${
                                mobileSize &&
                                isOpenNestedChild === childNavList.title
                                  ? "d-block"
                                  : ""
                              }`}
                            >
                              {childNavList.type === "sub" &&
                                childNavList.children.map(
                                  (nestedChildNavList, index) => (
                                    <li key={index}>
                                      <Link
                                        className="link"
                                        href={nestedChildNavList.path}
                                      >
                                        {nestedChildNavList.title}
                                      </Link>
                                    </li>
                                  )
                                )}
                            </ul>
                          )}
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default DropdownMenus;
