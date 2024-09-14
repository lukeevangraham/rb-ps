"use client";
import Button from "@/components/UI/Button/Button";

import classes from "./TourForm.module.scss";

const TourForm = () => {
  const submitForm = (e) => {
    console.log("Hello", e.target.firstName.value);
  };

  let theFormItself = (
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
      <div className={classes.Tour__Form__Button}>
        <Button
          button={{
            text: "Submit",
            clicked: null,
            newTab: false,
          }}
        />
      </div>
    </form>
  );

  return <div>{theFormItself}</div>;
};

export default TourForm;
