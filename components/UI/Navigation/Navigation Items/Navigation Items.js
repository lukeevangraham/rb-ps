"use client";

import { useState } from "react";
import NavigationItem from "./Navigation Item/Navigation Item";

import classes from "./Navigation Items.module.scss";

const NavigationItems = ({ links, button }) => {
  const [parentsClicked, setParentsClicked] = useState(false);

  return (
    <nav className={classes.Nav}>
      <ul className={classes.Nav__List}>
        {links.map((link) => (
          <NavigationItem
            key={link.id}
            item={link}
            parentsClicked={parentsClicked}
            setParentsClicked={setParentsClicked}
          />
        ))}
      </ul>

      {parentsClicked ? (
        <div className={`${classes.Nav__MegaMenu} ${classes.Nav__MegaMenu__on}`}>
          <div>Parent Handbook</div>
          <div>Calendar & Dates</div>
          <div>Registration Packets</div>
          <div>Helpful Resources</div>
        </div>
      ) : <div className={`${classes.Nav__MegaMenu__off}`}></div> }
    </nav>
  );
};

export default NavigationItems;
