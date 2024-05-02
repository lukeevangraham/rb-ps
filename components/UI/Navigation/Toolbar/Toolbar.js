import Image from "next/image";
import Brandname from "../../Brandname/Brandname";

import classes from "./Toolbar.module.scss";

const Toolbar = ({ global, children }) => (
  <div className={classes.Toolbar}>
    <div className={`${classes.Toolbar__Inner} row`}>
      <div className={classes.Toolbar__Inner__Brand}>
        <div className={classes.Toolbar__Inner__Brand__Logo}>
          <Image
            src={global.Navbar.Logo.data.attributes.url}
            fill={true}
            alt="RBCPC Preschool logo"
          />
        </div>
        <Brandname />
      </div>
      {children}
    </div>
  </div>
);

export default Toolbar;