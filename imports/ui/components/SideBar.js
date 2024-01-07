import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import SideBarElements from "./sideBarELements";

const SideBar = (props) => {
  const [currentPage, setCurrentPage] = useState("");

  const role =
    Meteor.userId() && Roles.getRolesForUser(Meteor.userId())[0]?.toLowerCase();

  $(document).ready(function () {
    $(".toggler").on("click", function () {
      $(".menu-container").toggleClass("active");
    });
    $(".nav-toggler").on("click", function () {
      $(".navbar-toggler").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });

    function setMenuHeight() {
      var navbarHeight = $(".navbar").outerHeight();
      $(".menu-wrapper")
        .outerHeight(document.documentElement.clientHeight - navbarHeight)
        .niceScroll({
          emulatetouch: true,
        });
    }

    setMenuHeight();
    $(window).on("resize", function () {
      setMenuHeight();
    });
  });
  console.log("++++++++++++++++++++++++++++++++");
  var currentPath = props.location.pathname.split("/")[2];
  console.log(props.location.pathname);
  console.log(currentPath);

  return (
    <div className="columns is-variable is-0">
      <div>
        <div className="menu-container px-1 has-background-white">
          <div className="menu-wrapper py-1">
            <aside className="menu">
              <div>
                {" "}
                <Avatar className="table_avatar" src="" />{" "}
              </div>
              <p className="menu-label has-text-lighter">General</p>

              <ul className="menu-list">
                {SideBarElements.map(
                  (e, i) =>
                    e.role.includes(role?.toUpperCase()) && (
                      <li onClick={(_) => setCurrentPage(e.path)}>
                        <Link
                          to={`/${role}/${e.path}`}
                          className={clsx("", {
                            "has-background-primary is-active":
                              e.path === currentPath,
                          })}
                        >
                          {e.icon}
                          {e.label}
                        </Link>
                        {e.path === currentPage && e.children && (
                          <ul>
                            {e.children.map((child) => (
                              <li>
                                <Link
                                  className={clsx("has-text-black", {
                                    "has-background-primary is-active":
                                      child.path === currentPath,
                                  })}
                                  to={`/${role}/${child.path}`}
                                >
                                  {child.icon}
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                )}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
