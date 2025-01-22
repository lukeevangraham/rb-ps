import Brandname from "../../Brandname/Brandname";
import Link from "next/link";

import classes from "./Footer.module.scss";
import Image from "next/image";

const Footer = ({ global }) => (
  <section className={`${classes.Footer} u-padding-y-large`}>
    <div className="row">
      <div className={classes.Footer__Container}>
        <div className={classes.Footer__Container__FirstColumn}>
          <div className={classes.Footer__Container__FirstColumn__Brand}>
            <Link href="/">
              <div
                className={classes.Footer__Container__FirstColumn__Brand__Logo}
              >
                <Image
                  src={global.Navbar.Logo.data.attributes.url}
                  alt="RBCPC Preschool Logo"
                  fill
                />
              </div>
              <div>
                <Brandname footer />
              </div>
            </Link>
          </div>
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
            <a
              href="https://www.shelbygiving.com/app/Form%2Fa136edcf-c499-44f6-8b62-263a79a26cfb"
              target="_blank"
            >
              Donate Here
            </a>
          </div>
        </div>
        <div>
          <div>
            <Link href="/programs">Programs</Link>
          </div>
          <div>
            <Link href="/programs/parent-and-child">
              Parent & Child Classes
            </Link>
          </div>
          <div>
            {" "}
            <Link href="/programs/preschool">Preschool</Link>{" "}
          </div>
          <div>
            {" "}
            <Link href="/programs/options"> Enrichment</Link>
          </div>
          <div></div>
        </div>
        <div>
          <div>Parents</div>
          <div>
            <Link href={`/parents/handbook`}>Parent Handbook</Link>
          </div>
          <div>
            <Link href={`/parents/calendar`}>Calendar & Dates</Link>
          </div>
          <div>
            <Link href={`/parents/registration`}>Registration Packets</Link>
          </div>
          <div>
            <Link href={`/parents/resources`}>Helpful Resources</Link>
          </div>
        </div>
        <div>
          <div>
            <Link href="/tuition">Tuition</Link>
          </div>
        </div>
        <div>
          <div>
            <Link href="/events">Special Events</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Footer;
