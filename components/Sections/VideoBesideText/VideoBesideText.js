import Image from "next/image";
import Link from "next/link";

import classes from "./VideoBesideText.module.scss";

const VideoBesideText = ({ data }) => (
  <section>
    <div className="row">
      <div className={classes.VideoBesideText}>
        <div className={classes.VideoBesideText__Video}>
          <div className={classes.VideoBesideText__Video__Frame}>
            <Link href={`/video?url=${data.videoURL}}`}>
              <Image src={data.videoURL.replace(".mp4", ".jpg")} fill />
            </Link>
            {/* <video src={data.videoURL} controls /> */}
          </div>
        </div>
        <div
          className={classes.VideoBesideText__Text}
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></div>
      </div>
    </div>
  </section>
);

export default VideoBesideText;
