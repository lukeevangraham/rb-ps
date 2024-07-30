import Link from "next/link";

import classes from "./NavigationItem.module.scss";

const NavigationItem = ({ item, parentsClicked, setParentsClicked }) => {
  return (
    <li>
      {item.url == "/parents" ? (
        <a href="#">
          <div
            className={classes.MenuChoice}
            onClick={() => setParentsClicked(!parentsClicked)}
          >
            {`${item.text} `}
            <div className={parentsClicked ? classes.MenuChoice__Arrow__Reverse : classes.MenuChoice__Arrow}>&gt;</div>
          </div>
        </a>
      ) : (
        <Link href={item.url}>{item.text}</Link>
      )}
    </li>
  );
};

export default NavigationItem;
