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
          <h3>Your information was successfully delivered</h3>
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
          <input
            type="text"
            name="firstName"
            placeholder="Your First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Your Last Name"
            required
          />
          <input type="tel" name="phone" placeholder="Your Phone" />
          <input type="email" name="email" placeholder="Your Email" required />
          <select name="dayOfWeek">
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
          </select>
          <select name="time">
            <option value="9:00 am">9:00 am</option>
            <option value="9:30 am">9:30 am</option>
            <option value="10:00 am">10:00 am</option>
          </select>
          <button className={classes.Tour__Form__Button}>Submit</button>
        </form>
      );
      break;
  }

  return <div>{theFormItself}</div>;
};

export default TourForm;
