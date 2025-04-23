import classes from "./ParentAndChildClassList.module.scss";

const renderClassTimes = (oldTime, increment) => {
  const startTime = new Date();
  startTime.setHours(oldTime.split(":")[0], oldTime.split(":")[1]);

  let endTime;

  //   CHECKING IF WE HAVE A DECIMAL INCREMENT
  if (increment % 1 != 0) {
    endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + increment * 60);
  } else {
    endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + increment);
  }

  return `${startTime
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .toLowerCase()} - ${endTime
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .toLowerCase()}`;
};

const ParentAndChildClassList = ({ program }) => {
  // FORMATTING REGISTRATION DATE FOR LOWERCASE AM WITH CAPITALIZED MONTH NAME
  let registrationDate = new Date(`${program.registrationOpenDate}`)
    .toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "PST",
    })
    .split(" ")
    .map((string, index, array) => {
      if (index === array.length - 1) {
        return string.toLowerCase();
      } else {
        return string;
      }
    })
    .join(" ");

  console.log("Registration date: ", registrationDate);

  return (
    <div className={`u-padding-y-large ${classes.ParentAndChildClassList}`}>
      <div className="row">
        <div className="u-max-width-p">
          <div className={classes.ParentAndChildClassList__Offerings}>
            <h3>Classes are offered on:</h3>
            <div className={classes.ParentAndChildClassList__Offerings__List}>
              {program.Class.map((PACClass) => (
                <div key={PACClass.id}>
                  {`${PACClass.dayOfWeek}, `}{" "}
                  {renderClassTimes(
                    PACClass.startTime,
                    PACClass.dailyClassHours
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="u-max-width-p">
          <div className={`${classes.ParentAndChildClassList__Sessions}`}>
            {program.Session.map((session) => (
              <div key={session.id}>
                <h6 key={session.id}>{session.Name}</h6>
                <div>
                  Class Dates:{" "}
                  {`${new Date(
                    `${session.sessionStartDate} PST`
                  ).toLocaleDateString("en-US")} through ${new Date(
                    `${session.sessionEndDate} PST`
                  ).toLocaleDateString("en-US")}`}
                </div>
                <div>{`$${(Math.round(session.Tuition * 100) / 100).toFixed(
                  2
                )} (${session.weeksOfClass} weeks)`}</div>
                <div>{`NO CLASS: ${session.noClassDates}`}</div>
              </div>
            ))}
          </div>
          <div dangerouslySetInnerHTML={{ __html: program.Note }} />
          {program.Session.map((session) => (
            <div
              className={classes.ParentAndChildClassList__PaymentDate}
              key={session.id}
            >{`Payment for ${session.Name} is due ${new Date(
              `${session.paymentDueDate} PST`
            ).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}`}</div>
          ))}
          <div
            className={classes.ParentAndChildClassList__Registration}
          >{`Online registration opens on ${registrationDate}`}</div>
        </div>
      </div>
    </div>
  );
};

export default ParentAndChildClassList;
