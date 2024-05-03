import classes from "./HeadingAboveColumns.module.scss";

const HeadingAboveColumns = ({ data }) => (
  <section className="u-padding-y-large">
    <div className={classes.HeadingAboveColumns}>
      <h2>{data.Heading}</h2>
      <div className={classes.HeadingAboveColumns__Columns}>
        {console.log("D: ", data)}
        {data.Column.map((column) => (
          <div dangerouslySetInnerHTML={{ __html: column.Text }} />
        ))}
      </div>
    </div>
  </section>
);

export default HeadingAboveColumns;
