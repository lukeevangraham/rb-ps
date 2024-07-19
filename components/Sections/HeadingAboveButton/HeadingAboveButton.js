import Button from "@/components/UI/Button/Button";

import classes from "./HeadingAboveButton.module.scss";

const HeadingAboveButton = ({ data }) => (
  <section className={`${classes.HeadingAboveButton} u-padding-y-large`}>
    <div className="row">
      {data.Heading ? <h3>{data.Heading}</h3> : null}
      <Button button={data.Button} />{" "}
    </div>
  </section>
);

export default HeadingAboveButton;
