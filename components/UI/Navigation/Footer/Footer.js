import Brandname from "../../Brandname/Brandname";

import classes from "./Footer.module.scss";

const Footer = () => (
  <section className={`${classes.Footer} u-padding-y-large`}>
    <div className="row">
      <div className={classes.Footer__Container}>
        <div>
          <div>RBCPC Preschool</div>
          <div>17010 Pomerado Road, San Diego, CA 92128</div>
          <div>Phone: (858) 487-0824</div>
          <div>Fax: (858) 487-8203</div>
          <div>Email: rbcpcpreschool@rbcpc.org</div>
          <div>Office hours: Mon.-Fri., 8:00am - 4:00pm</div>
        </div>
        <div>
          <div>About Us</div>
          <div>Our Philosophy</div>
          <div>FAQs</div>
          <div>Our Staff</div>
          <div>Contact Us</div>
          <div>Donate Here</div>
        </div>
        <div>
          <div>Programs</div>
          <div>Parent & Child Classes</div>
          <div>Preschool</div>
          <div>Extended Day</div>
          <div></div>
        </div>
        <div>
          <div>Tuition</div>
        </div>
        <div>
          <div>Parents</div>
          <div>Parent Handbook</div>
          <div>Calendar & Dates</div>
          <div>Registration Packets</div>
          <div>Helpful Resources</div>
        </div>
        <div>
          <div>Special Events</div>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;
