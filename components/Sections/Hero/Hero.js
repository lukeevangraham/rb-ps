"use client";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";

import classes from "./Hero.module.scss";

const Hero = ({ data }) => {
  const amountOfMainImages = data.mainImage.data.length;
  const [displayedImage, setDisplayedImage] = useState(
    Math.floor(Math.random() * amountOfMainImages)
  );

  useEffect(() => {
    const increment = () => {
      if (displayedImage < amountOfMainImages - 1) {
        return setDisplayedImage((prev) => prev + 1);
      } else {
        return setDisplayedImage(0);
      }
    };

    const id = setInterval(increment, 5000);

    return () => {
      clearInterval(id);
    };
  }, [displayedImage, amountOfMainImages]);

  return (
    <section className={`${classes.Wrapper}`}>
      <div className={classes.Wrapper__Image}>
        <picture>
          <source
            media="(max-width: 37.5em)"
            srcSet={`${data.mainImage.data[
              displayedImage
            ].attributes.url.replace(
              "/upload/",
              `/upload/c_fill,g_face,h_717,w_500/`
            )}`}
          />
          <source
            media="(max-width: 56.25em)"
            srcSet={`${data.mainImage.data[
              displayedImage
            ].attributes.url.replace(
              "/upload/",
              `/upload/c_fill,g_face,h_800,w_900/`
            )}`}
          />
          <source
            media="(min-width: 56.26em)"
            srcSet={`${data.mainImage.data[displayedImage].attributes.url}`}
          />
          <Image
            src={`${data.mainImage.data[displayedImage].attributes.url}`}
            alt={
              data.mainImage.data[displayedImage].attributes.alternativeText
                ? `${data.mainImage.data[displayedImage].attributes.alternativeText}`
                : "Happy preschool kids having fun"
            }
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </picture>
      </div>
      <div className={classes.Wrapper__Overlay} />
      <div className={classes.Hero}>
        <div className="row">
          {/* {console.log("Data", data.Button)} */}
          <div className={classes.Hero__Text}>
            <Fade cascade damping={0.2} triggerOnce>
              <h1 className={classes.Hero__Text__Headline}>{data.headline}</h1>
              <div className={classes.Hero__Text__Subheading}>
                {data.subheading}
              </div>

              {data.Button
                ? data.Button.map((button) => (
                    <div className={classes.Hero__Text__Button} key={button.id}>
                      <Button button={button} />
                    </div>
                  ))
                : null}
            </Fade>
          </div>
          {/* <div className={classes.Hero__MainImage}>
            <Image
              src={data.mainImage.data[randomImageFromArray].attributes.url}
              alt={
                data.mainImage.data[randomImageFromArray].attributes
                  .alternativeText
              }
              fill
              priority
            />
          </div> */}

          {/* <svg viewBox="0 0 398.6 435.4" width="0" height="0">
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
          </svg> */}
        </div>
      </div>
    </section>
  );
};

Hero.displayName = "Hero";

export default Hero;
