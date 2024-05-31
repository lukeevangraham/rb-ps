import Button from "@/components/UI/Button/Button";

import classes from "./HeadingAboveButton.module.scss";

const HeadingAboveButton = ({ data }) => (
  <section className={`${classes.HeadingAboveButton} u-padding-y-large`}>
    <div className="row">
      <h3>{data.Heading}</h3>
      <Button button={data.Button} />{" "}
    </div>
  </section>
);

export default HeadingAboveButton;
