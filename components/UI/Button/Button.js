import Link from "next/link";

import classes from "./Button.module.scss";

// The Button component that takes a single "button" prop as an argument
const Button = ({ button }) => {
  let buttonInnards;

  if (button.newTab) {
    buttonInnards = (
      // Using an anchor tag with a "target" attribute set to "_blank"
      <a target="_blank" className={classes.Button}>
        {/* Displaying the text for the button from the "button.text" prop */}
        {button.text}
      </a>
    );
  } else {
    buttonInnards = (
      // Otherwise, the link will open in the same tab
      <a
        className={
          button.fromAbout
            ? `${classes.Button} ${classes.Button__FromAbout}`
            : `${classes.Button}`
        }
      >
        {/* Displaying the text for the button from the "button.text" prop */}
        {button.text}
      </a>
    );
  }

  return (
    // Using the Link component to handle navigation to the given "button.url"
    <>
      {button.url ? (
        <Link href={button.url} legacyBehavior>
          {buttonInnards}
        </Link>
      ) : (
        <div onClick={button.clicked}>{buttonInnards}</div>
      )}
    </>
  );
};
// Exporting the Button component as the default export
export default Button;
