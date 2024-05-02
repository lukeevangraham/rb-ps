import NavigationItem from "./Navigation Item/Navigation Item";

import classes from "./Navigation Items.module.scss";

const NavigationItems = ({ links, button }) => (
  <nav className={classes.Nav}>
    <ul className={classes.Nav__List}>
      {links.map((link) => (
        <NavigationItem key={link.id} item={link} />
      ))}
    </ul>
  </nav>
);

export default NavigationItems;
