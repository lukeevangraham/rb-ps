"use client";

import React, { useState } from "react";
import NavigationItem from "./Navigation Item/Navigation Item";
import Link from "next/link";

import classes from "./Navigation Items.module.scss";

const NavigationItems = ({ links, button }) => {
  const [parentsClicked, setParentsClicked] = useState(false);

  const parentMenu = (source) => (
    <div className={source == "toolbar" ? classes.DesktopOnly : classes.MobileOnly}>
      <div className={`${classes.Nav__MegaMenu} ${classes.Nav__MegaMenu__on}`}>
        <li>
          <Link href={`/parents/handbook`}>Parent Handbook</Link>
        </li>
        <li>
          <Link href={`/parents/calendar`}>Calendar & Dates</Link>
        </li>
        <li>
          <Link href={`/parents/registration`}>Registration Packets</Link>
        </li>
        <li>
          <Link href={`/parents/resources`}>Helpful Resources</Link>
        </li>
      </div>
    </div>
  );

  return (
    <nav className={classes.Nav}>
      <ul className={classes.Nav__List}>
        {links.map((link) => (
          <React.Fragment key={link.id}>
            <NavigationItem
              item={link}
              parentsClicked={parentsClicked}
              setParentsClicked={setParentsClicked}
            />
            {parentsClicked && link.url == "/parents"
              ? parentMenu("sideDrawer")
              : null}
          </React.Fragment>
        ))}
      </ul>

      {parentsClicked ? (
        parentMenu("toolbar")
      ) : (
        <div
          className={`${classes.Nav__MegaMenu} ${classes.Nav__MegaMenu__off}}`}
        ></div>
      )}
    </nav>
  );
};

export default NavigationItems;
