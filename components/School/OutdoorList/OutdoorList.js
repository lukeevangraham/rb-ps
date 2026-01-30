import React from "react";

import classes from "./OutdoorList.module.scss";

const OutdoorList = ({ data, pricePerDay }) => (
  <div className={classes.OutdoorList}>
    {console.log("OutdoorList data:", data)}
    <div className={classes.OutdoorList__Heading}></div>
    <div className={classes.OutdoorList__Heading}></div>
    <div className={classes.OutdoorList__Heading}></div>
    <div className={classes.OutdoorList__Heading}>Mon./Wed.</div>
    <div className={classes.OutdoorList__Heading}>Tue. only</div>
    {data.map((item, index) => (
      <React.Fragment key={item.id}>
        <div
          className={`${classes.OutdoorList__Body} ${classes.OutdoorList__Body__Session}`}
        >
          Session {index + 1}
        </div>
        <div className={classes.OutdoorList__Body}>
          {new Date(
            item.StartDate.replace(/-/g, "/").replace(/T.+/, ""),
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}{" "}
          -{" "}
          {new Date(
            item.EndDate.replace(/-/g, "/").replace(/T.+/, ""),
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </div>
        <div className={classes.OutdoorList__Body}>
          {`(${item.WeeksOfClass} weeks of class /${item.ClassDays} class days)`}
        </div>
        <div className={classes.OutdoorList__Body}>
          <span className={classes.OutdoorList__DesktopHide}>Mon./Wed. </span> $
          {item.MondayWednesdayPrice}
        </div>
        <div className={classes.OutdoorList__Body}>
          <span className={classes.OutdoorList__DesktopHide}>Tue. </span> $
          {item.TuesdayOnlyPrice}
        </div>
      </React.Fragment>
    ))}
  </div>
);

export default OutdoorList;
