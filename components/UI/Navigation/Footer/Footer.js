import Brandname from "../../Brandname/Brandname";

import classes from "./Footer.module.scss";

const Footer = () => (
  <section className={`${classes.Footer} u-padding-y-large`}>
    <div className="row">
      <div className={classes.Footer__Container}>
        <div>
            <div>RBCPC Preschool</div>
            <div>17010 Pomerado Road</div>
            <div>San Diego, CA 92128</div>
        </div>
        <div>Useful Links</div>
        <div>Resources</div>
      </div>
    </div>
  </section>
);

export default Footer;
