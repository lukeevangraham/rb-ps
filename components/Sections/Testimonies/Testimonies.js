import Image from "next/image";
import { Flip } from "react-awesome-reveal";
import { Fade } from "react-awesome-reveal";

import classes from "./Testimonies.module.scss";

const Testimonies = ({ data }) => (
  <section className="u-padding-y-large">
    <div className="row">
      <div className={classes.Testimonies}>
        <h2>{data.Heading}</h2>
        <div className={classes.Testimonies__Group}>
          <Fade cascade triggerOnce>
            {data.Testimony.map((testimony) => (
              <div
                key={testimony.id}
                className={classes.Testimonies__Group__Testimony}
              >
                <div className={classes.Testimonies__Group__Testimony__Text}>
                  <p>{testimony.Statement}</p>
                  <div
                    className={
                      classes.Testimonies__Group__Testimony__Text__Bottom
                    }
                  >
                    <h5>
                      {testimony.FirstName} {Array.from(testimony.LastName)[0]}.
                    </h5>
                    <div>
                      <svg>
                        <use xlinkHref="../images/sprite.svg#icon-star-full" />
                      </svg>
                      <svg>
                        <use xlinkHref="../images/sprite.svg#icon-star-full" />
                      </svg>
                      <svg>
                        <use xlinkHref="../images/sprite.svg#icon-star-full" />
                      </svg>
                      <svg>
                        <use xlinkHref="../images/sprite.svg#icon-star-full" />
                      </svg>
                      <svg>
                        <use xlinkHref="../images/sprite.svg#icon-star-full" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className={classes.Testimonies__Group__Testimony__Image}>
                  <Image
                    src={testimony.Photo.data.attributes.url}
                    alt={testimony.Photo.data.attributes.alternativeText}
                    fill
                  />
                </div>
              </div>
            ))}
          </Fade>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonies;
