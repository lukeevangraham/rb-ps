"use client";

import { useState } from "react";
import NavigationItem from "./Navigation Item/Navigation Item";
import Link from "next/link";

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
        <div
          className={`${classes.Nav__MegaMenu} ${classes.Nav__MegaMenu__on}`}
        >
          <div>
            <Link href={`/parents/handbook`}>Parent Handbook</Link>
          </div>
          <div>
            <Link href={`/parents/calendar`}>Calendar & Dates</Link>
          </div>
          <div>
            <Link href={`/parents/registration`}>Registration Packets</Link>
          </div>
          <div>
            <Link href={`/parents/resources`}>Helpful Resources</Link>
          </div>
        </div>
      ) : (
        <div
          className={`${classes.Nav__MegaMenu} ${classes.Nav__MegaMenu__off}`}
        ></div>
      )}
    </nav>
  );
};

export default NavigationItems;
