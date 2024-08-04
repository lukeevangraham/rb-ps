import Image from "next/image";
import Link from "next/link";
import Backdrop from "../../Backdrop/Backdrop";
import Brandname from "../../Brandname/Brandname";

import classes from "./SideDrawer.module.scss";

const SideDrawer = ({ open, closed, global }) => (
  <>
    <Backdrop show={open} clicked={closed} />
    <div
      className={`${classes.SideDrawer} ${
        open ? classes.SideDrawer__open : classes.SideDrawer__closed
      }`}
    >
      <Link href={`/`}>
        <div className={classes.SideDrawer__Brand}>
          <div className={classes.SideDrawer__Brand__Logo}>
            <Image
              src={global.Navbar.Logo.data.attributes.url}
              alt={global.Navbar.Logo.data.attributes.alternativeText}
              fill
            />
          </div>
          <div className={classes.SideDrawer__Brand__Brandname}>
            <Brandname />
          </div>
        </div>
      </Link>
      <div className={classes.SideDrawer__Nav}>
        <ul>
          {global.Navbar.Links.map((link) => (
            <li key={link.id}>
              <Link href={`.${link.url}`}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* {console.log("SD G: ", global.Navbar)} */}
    </div>
  </>
);

export default SideDrawer;
