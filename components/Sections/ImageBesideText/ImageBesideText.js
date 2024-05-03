import Image from "next/image";

import classes from "./ImageBesideText.module.scss";

const ImageBesideText = ({ data }) => (
  <div className="row">
    <div className={classes.ImageBesideText}>
      <div className={classes.ImageBesideText__Image}>
        <div className={classes.ImageBesideText__Image__Frame}>
          <Image
            src={data.image.data.attributes.url}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div
        className={classes.ImageBesideText__Text}
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></div>
    </div>
  </div>
);

export default ImageBesideText;
