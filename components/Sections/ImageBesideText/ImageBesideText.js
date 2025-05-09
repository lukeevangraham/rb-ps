import Image from "next/image";
import { Slide } from "react-awesome-reveal";

import classes from "./ImageBesideText.module.scss";

const ImageBesideText = ({ data }) => (
  <div className="row">
    <div className={classes.ImageBesideText}>
      <div className={classes.ImageBesideText__Image}>
        <Slide>
          <div className={classes.ImageBesideText__Image__Frame}>
            <Image
              src={data.image.data.attributes.url}
              alt={data.image.data.attributes.alternativeText}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </Slide>
      </div>

      <div
        className={classes.ImageBesideText__Text}
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></div>
    </div>
  </div>
);

export default ImageBesideText;
