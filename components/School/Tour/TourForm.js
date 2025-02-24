"use client";
import { useState } from "react";
import Button from "@/components/UI/Button/Button";

import classes from "./TourForm.module.scss";

const TourForm = () => {
  const [messageStatus, setMessageStatus] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    setMessageStatus(1);

    const res = await fetch("/api/tour", {
      body: JSON.stringify({
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        dayOfWeek: e.target.dayOfWeek.value,
        time: e.target.time.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log("RES: ", result);

    result.status === 200 ? setMessageStatus(200) : null;
  };

  let theFormItself = "";

  switch (messageStatus) {
    case 0:
      break;
    case 200:
      theFormItself = (
        <div className={classes.Tour__Form__Success}>
          <h3>Your information was successfully delivered. Someone from our office will connect with you shortly to confirm your tour.</h3>
        </div>
      );
      break;
    case 1:
      theFormItself = (
        <div className={classes.Tour__Form__Success}>Sending ...</div>
      );
      break;
    default:
      theFormItself = (
        <form
          className={`u-max-width-p ${classes.Tour__Form}`}
          onSubmit={submitForm}
        >
          <div className={classes.Tour__Form__Group}>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              required
            />
            <label
              className={classes.Tour__Form__Group__Label}
              htmlFor="firstName"
            >
              First name
            </label>
          </div>
          <div className={classes.Tour__Form__Group}>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              required
            />
            <label
              className={classes.Tour__Form__Group__Label}
              htmlFor="lastName"
            >
              Last name
            </label>
          </div>
          <div className={classes.Tour__Form__Group}>
            <input type="tel" name="phone" placeholder="Phone number" />
            <label className={classes.Tour__Form__Group__Label} htmlFor="phone">
              Phone number
            </label>
          </div>
          <div className={classes.Tour__Form__Group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <label className={classes.Tour__Form__Group__Label} htmlFor="email">
              Email
            </label>
          </div>
          <div className={classes.Tour__Form__Group}>
            <select name="dayOfWeek">
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
            <label
              className={classes.Tour__Form__Group__Label}
              htmlFor="dayOfWeek"
            >
              Day to schedule tour
            </label>
          </div>
          <div className={classes.Tour__Form__Group}>
            <select name="time">
              <option value="9:00 am">9:00 am</option>
              <option value="9:30 am">9:30 am</option>
              <option value="10:00 am">10:00 am</option>
            </select>
            <label className={classes.Tour__Form__Group__Label} htmlFor="time">
              Time to schedule tour
            </label>
          </div>
          <button className={classes.Tour__Form__Button}>Submit</button>
        </form>
      );
      break;
  }

  return <div>{theFormItself}</div>;
};

export default TourForm;
