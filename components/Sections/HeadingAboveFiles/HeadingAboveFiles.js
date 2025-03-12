import Button from "@/components/UI/Button/Button";

import classes from "./HeadingAboveFiles.module.scss";

const HeadingAboveFiles = ({ data }) => (
  <section className={`${classes.HeadingAboveFiles} u-padding-y-large`}>
    <div className="row">
      {data.Heading ? <h3>{data.Heading}</h3> : null}
      {data.Files.data.map((file) => (
        <Button
          key={file.id}
          button={{
            newTab: true,
            url: file.attributes.url,
            text: file.attributes.name,
          }}
        />
      ))}
    </div>
  </section>
);

export default HeadingAboveFiles;
