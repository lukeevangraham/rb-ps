"use client";

import { useState } from "react";
import Input from "@/components/UI/Input/Input";

import classes from "./ContactForm.module.scss";

const ContactForm = () => {
  const [messageStatus, setMessageStatus] = useState("");
  const [contactForm, setContactForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name",
      },
      value: "",
      validation: {
        required: true,
      },
    },
    phone: {
      elementType: "input",
      elementConfig: {
        type: "phone",
        placeholder: "Phone",
      },
      value: "",
      validation: {
        required: false,
      },
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      value: "",
      validation: {
        required: true,
      },
    },
    message: {
      elementType: "textarea",
      elementConfig: {
        minrows: 8,
        placeholder: "Message",
      },
      value: "",
      validation: {
        required: true,
      },
    },
  });

  const submitForm = async (e) => {
    e.preventDefault();
    setMessageStatus(1);

    const res = await fetch("/api/contact", {
      body: JSON.stringify({
        name: e.target.Name.value,
        phone: e.target.Phone.value,
        email: e.target.Email.value,
        message: e.target.Message.value,
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

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedContactForm = {
      ...contactForm,
    };
    const updatedFormElement = {
      ...updatedContactForm[inputIdentifier],
    };

    updatedFormElement.value = e.target.value;

    updatedFormElement.touched = true;
    updatedContactForm[inputIdentifier] = updatedFormElement;
    setContactForm(updatedContactForm);
  };

  const formElementsArray = [];
  for (let key in contactForm) {
    formElementsArray.push({
      id: key,
      config: contactForm[key],
    });
  }

  let form = "";

  switch (messageStatus) {
    case 0:
      break;
    case 200:
      form = (
        <div className={classes.Form__Success}>
          <h3>Your message was successfully delivered</h3>
        </div>
      );
      break;
    case 1:
      form = <div className={classes.Form__Success}>Sending...</div>;
      break;
    default:
      form = (
        <form
          encType="multipart/form-data"
          className={classes.Form}
          onSubmit={submitForm}
        >
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(e) => inputChangedHandler(e, formElement.id)}
              required={formElement.config.validation.required}
              width={formElement.config.width}
            />
          ))}
          <button className={classes.Form__Button}>Submit</button>
        </form>
      );
      break;
  }

  return <div>{form}</div>;
};

export default ContactForm;
