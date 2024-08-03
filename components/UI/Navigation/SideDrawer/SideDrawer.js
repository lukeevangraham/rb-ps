import Backdrop from "../../Backdrop/Backdrop";

import classes from "./SideDrawer.module.scss";

const SideDrawer = ({ open, closed, global }) => (
  <>
    <Backdrop show={open} clicked={closed} />
    <div
      className={`${classes.SideDrawer} ${
        open ? classes.SideDrawer__open : classes.SideDrawer__closed
      }`}
    >
      SideDrawer
    </div>
  </>
);

export default SideDrawer;
