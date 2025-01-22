import React from "react";

import classes from "./OutdoorList.module.scss"

const OutdoorList = ({ data }) => (
  <div className={classes.OutdoorList}>
    <div className={classes.OutdoorList__Heading}></div>
    <div className={classes.OutdoorList__Heading}></div>
    <div className={classes.OutdoorList__Heading}></div>
    <div className={classes.OutdoorList__Heading}>
      Mon./Wed.
    </div>
    <div className={classes.OutdoorList__Heading}>
      Tue. only
    </div>
    {data.map(
      (item, index) => (
        <React.Fragment key={item.id}>
          <div className={classes.OutdoorList__Body}>
            Session {index + 1}
          </div>
          <div className={classes.OutdoorList__Body}>
            {new Date(
              item.StartDate.replace(/-/g, "/").replace(/T.+/, "")
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}{" "}
            -{" "}
            {new Date(
              item.EndDate.replace(/-/g, "/").replace(/T.+/, "")
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className={classes.OutdoorList__Body}>
            {`(${item.WeeksOfClass} weeks of class /${item.ClassDays} class days)`}
          </div>
          <div className={classes.OutdoorList__Body}>
            ${item.ClassDays.split(" or ")[0] * 25}
          </div>
          <div className={classes.OutdoorList__Body}>
            ${item.ClassDays.split(" or ")[1] * 25}
          </div>
        </React.Fragment>
      )
    )}
  </div>
);

export default OutdoorList;
