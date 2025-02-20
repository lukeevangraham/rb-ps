import React from "react";

import classes from "./ClassList.module.scss";

const renderClassTimes = (oldTime, increment) => {
  const startTime = new Date();
  startTime.setHours(oldTime.split(":")[0], oldTime.split(":")[1]);

  let endTime = new Date(startTime);

  if (increment % 1 !== 0) {
    const multiplier = (increment + "").split(".")[1] * 0.1;
    endTime.setHours(endTime.getHours() + (increment + "").split(".")[0]);
    const newEndTime = new Date(endTime.getTime() + ((60 * multiplier) * 60000));
    endTime = newEndTime
  } else {
    endTime.setHours(endTime.getHours() + increment);
  }

  return (
    <div
      className={`${classes.ClassList__Time} ${classes.ClassList__Body}`}
    >{`${startTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })} - ${endTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`}</div>
  );
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ClassList = ({ program }) => (
  <div className="row">
    <div className={classes.ClassList}>
      <div className={classes.ClassList__Heading}> </div>
      <div className={classes.ClassList__Heading}> </div>
      <div className={classes.ClassList__Heading}> </div>
      <div className={classes.ClassList__Heading}>Annual Tuition</div>
      <div
        className={`${classes.ClassList__Heading} ${classes.ClassList__TenPayments}`}
      >
        Ten Equal Payments of
      </div>

      {program.Class.map((item) => (
        <React.Fragment key={item.id}>
          <div
            className={`${classes.ClassList__DayOfWeek} ${classes.ClassList__Body}`}
          >
            {item.dayOfWeek}
          </div>
          <div
            className={`${classes.ClassOption__Classes__Class} ${classes.ClassList__Body}`}
          >{`${item.dailyClassHours} hours -- ${item.numberOfDaysPerWeek}x a week`}</div>
          {renderClassTimes(item.startTime, item.dailyClassHours)}
          <div className={classes.ClassList__Body}><span className={classes.ClassList__DesktopHide}>Annual Tuition: </span> {`$${numberWithCommas(
            item.annualTuition
          )}`}</div>
          <div className={classes.ClassList__Body}><span className={classes.ClassList__DesktopHide}>Ten Equal Payments of: </span> {`$${numberWithCommas(
            item.annualTuition / 10
          )}`}</div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

export default ClassList;
