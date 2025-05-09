import classes from "./FAQs.module.scss";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

const FAQs = ({ data, fromHome }) => (
  <section className={`${classes.QandA} u-padding-y-large`} id="FAQs">
    <div className="row">
      <div className={classes.FAQs}>
        <h2>{data.Heading}</h2>
        <div className={classes.FAQs__Group}>
          <Fade triggerOnce>
            {data.QandA.map((QandA) => (
              <div key={QandA.id}>
                <h5>{QandA.Question}</h5>
                <div dangerouslySetInnerHTML={{ __html: QandA.Answer }} />
              </div>
            ))}
          </Fade>
        </div>
        {fromHome ? (
          <Link href={"/about#FAQs"}>
            {" "}
            <h4>More FAQs</h4>
          </Link>
        ) : null}
      </div>
    </div>
  </section>
);

export default FAQs;
