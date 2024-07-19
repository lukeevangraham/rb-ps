import Brandname from "../../Brandname/Brandname";
import Link from "next/link";

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
          <div>
            <Link href="/about">About Us</Link>
          </div>
          <div>
            <Link href="/about#Philosophy">Our Philosophy</Link>
          </div>
          <div>FAQs</div>
          <div>
            <Link href="/about#OurStaff">Our Staff</Link>
          </div>
          <div>
            <Link href="/about/contact">Contact Us</Link>
          </div>
          <div>
            <a href="https://www.shelbygiving.com/app/Form%2Fa136edcf-c499-44f6-8b62-263a79a26cfb" target="_blank">
              Donate Here
            </a>
          </div>
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
