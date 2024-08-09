import Image from "next/image";
import Button from "@/components/UI/Button/Button";

import classes from "./Hero.module.scss";

const Hero = ({ data }) => (
  <section className={`${classes.Background}`}>
    <div className="row">
      <div className={classes.Hero}>
        {/* {console.log("Data", data.Button)} */}
        <div className={classes.Hero__Text}>
          <div className={classes.Hero__Text__Headline}>{data.headline}</div>
          <div className={classes.Hero__Text__Subheading}>
            {data.subheading}
          </div>

          {data.Button
            ? data.Button.map((button) => (
                <Button button={button} key={button.id} />
              ))
            : null}
        </div>
        <div className={classes.Hero__MainImage}>
          <Image
            src={data.mainImage.data.attributes.url}
            alt={data.mainImage.data.attributes.alternativeText}
            fill
            priority
          />
        </div>

        <svg viewBox="0 0 398.6 435.4" width="0" height="0">
          <clipPath
            id="blob1"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.002508, 0.002296)"
          >
            <path
              d="M332.3,48.8c32.6,18.1,58.5,49.4,64.7,83.7c6.3,34.3-7.1,71.5-15.8,107.1c-8.6,35.7-12.6,69.7-26,108.4
		c-13.5,38.6-36.5,81.9-68,86.9c-31.4,5-71.5-28.3-117.1-41.8c-45.7-13.6-97.1-7.5-123.9-28.3c-26.7-20.8-28.9-68.5-35-115.4
		c-6.2-46.8-16.4-92.6-8-138c8.3-45.3,35.3-90,74.7-105s91.3-0.3,136.9,9.6C260.4,25.8,299.7,30.6,332.3,48.8z"
            />
          </clipPath>
        </svg>
      </div>
    </div>
  </section>
);

export default Hero;
