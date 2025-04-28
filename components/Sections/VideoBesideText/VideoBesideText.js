import Image from "next/image";
import Link from "next/link";
import { Fade, Slide } from "react-awesome-reveal";

import PlayIcon from "../../../public/images/play.svg";

import classes from "./VideoBesideText.module.scss";

const VideoBesideText = ({ data }) => (
  <section>
    <div className="row">
      <div className={classes.VideoBesideText}>
        <div className={classes.VideoBesideText__Video}>
          <Link href={`/video?url=${data.videoURL}}`}>
            <svg>
              <use xlinkHref="../images/sprite.svg#icon-play" />
            </svg>
            <Image
              src={PlayIcon}
              className={classes.VideoBesideText__Video__Frame}
              alt="Play icon to start a video"
            />
            {/* <Link href={`/video?url=${data.videoURL}}`}> */}

            <Image
              src={data.videoURL.replace(".mp4", ".jpg")}
              alt="photo of a child playing"
              fill
            />
            {/* </Link> */}
          </Link>
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
