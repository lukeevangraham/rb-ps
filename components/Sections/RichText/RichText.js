import classes from "./RichText.module.scss";

const RichText = ({ data }) => (
  <section className={`u-padding-y-large ${classes.RichText}`}>
    <div className="row">
      <div dangerouslySetInnerHTML={{ __html: data.RichText }}>{console.log("D: ", data)}</div>
    </div>
  </section>
);

export default RichText;
