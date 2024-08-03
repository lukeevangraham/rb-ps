import Image from "next/image";
import Link from "next/link";
import Brandname from "../../Brandname/Brandname";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import classes from "./Toolbar.module.scss";

const Toolbar = ({ global, children, drawerToggleClicked }) => (
  <div className={classes.Toolbar}>
    <div className={`${classes.Toolbar__Inner} row`}>
      <div className={classes.Toolbar__Inner__Brand}>
        <div className={classes.Toolbar__Inner__Brand__Logo}>
          <Link href="/">
            <Image
              src={global.Navbar.Logo.data.attributes.url}
              alt="RBCPC Preschool logo"
              fill
              priority
            />
          </Link>
        </div>
        <Link href="/">
          <Brandname />
        </Link>
      </div>
      {children}
      <DrawerToggle clicked={drawerToggleClicked} />
    </div>
  </div>
);

export default Toolbar;
