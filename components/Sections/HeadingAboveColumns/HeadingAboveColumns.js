import Image from "next/image";

import classes from "./HeadingAboveColumns.module.scss";

const HeadingAboveColumns = ({ data }) => (
  <section className="u-padding-y-large">
    <div className={classes.HeadingAboveColumns}>
      <h2>{data.Heading}</h2>
      <div className={classes.HeadingAboveColumns__Columns}>
        {data.Column.map((column) => (
          <div
            className={classes.HeadingAboveColumns__Columns__Column}
            key={column.id}
          >
            <div
              className={classes.HeadingAboveColumns__Columns__Column__Image}
            >
              <Image
                src={column.Image.data.attributes.url}
                alt={column.Image.data.attributes.alternativeText}
                fill
              />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: column.Text }}
              className={classes.HeadingAboveColumns__Columns__Column__Text}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeadingAboveColumns;
