import classes from "./DrawerToggle.module.scss";

const DrawerToggle = ({ clicked }) => (
  <div className={classes.DrawerToggle} onClick={clicked}>
    <div className={classes.DrawerToggle__IconWrap}>
      <span className={classes.DrawerToggle__IconWrap__Icon}>&nbsp;</span>
    </div>
    <div className={classes.DrawerToggle__Label}>Menu</div>
  </div>
);

export default DrawerToggle;
