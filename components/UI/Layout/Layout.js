"use client";

// import { Lato } from "next/font/google";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import NavigationItems from "../Navigation/Navigation Items/Navigation Items";
import Footer from "../Navigation/Footer/Footer";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.scss";

// const lato = Lato({
//   weight: "400",
//   subsets: ["latin"],
//   variable: '--font-lato',
//   display: "swap",
// });

const Layout = ({ global, children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <>
      {/* <Modal show /> */}
      <div className={classes.Layout}>
        <Toolbar global={global} drawerToggleClicked={sideDrawerToggleHandler}>
          <div className={classes.Layout__DesktopOnly}>
            <NavigationItems
              links={global.Navbar.Links}
              button={global.Navbar.Button}
            />
          </div>
        </Toolbar>
        <div>Hello</div>
        <SideDrawer
          open={showSideDrawer}
          closed={sideDrawerClosedHandler}
          global={global}
        />
        <div className={classes.Layout__Main}>
          {children}

          <Footer global={global} />
        </div>
      </div>
    </>
  );
};

export default Layout;
