import classes from "./FAQs.module.scss";

const FAQs = ({ data }) => (
  <section className={`${classes.QandA} u-padding-y-large`}>
    <div className="row">
      <div className={classes.FAQs}>
        <h2>{data.Heading}</h2>
        <div className={classes.FAQs__Group}>
          {data.QandA.map((QandA) => (
            <div key={QandA.id}>
              <h5>{QandA.Question}</h5>
              <div dangerouslySetInnerHTML={{ __html: QandA.Answer }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default FAQs;
