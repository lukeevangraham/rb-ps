import Button from "@/components/UI/Button/Button";
import { Bounce } from "react-awesome-reveal";

import classes from "./HeadingAboveButton.module.scss";

const HeadingAboveButton = ({ data }) => (
  <section className={`${classes.HeadingAboveButton} u-padding-y-large`}>
    <div className="row">
      {data.Heading ? <h3>{data.Heading}</h3> : null}
      <Bounce triggerOnce>
        <Button button={data.Button} />{" "}
      </Bounce>
    </div>
  </section>
);

export default HeadingAboveButton;
