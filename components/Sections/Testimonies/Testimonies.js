import Image from "next/image";

import classes from "./Testimonies.module.scss";

const Testimonies = ({ data }) => (
  <section className="u-padding-y-large">
    <div className="row">
      <div className={classes.Testimonies}>
        <h2>{data.Heading}</h2>
        <div className={classes.Testimonies__Group}>
          {data.Testimony.map((testimony) => (
            <div
              key={testimony.id}
              className={classes.Testimonies__Group__Testimony}
            >
              <p>{testimony.Statement}</p>
              <div className={classes.Testimonies__Group__Testimony__Bottom}>
                <div
                  className={
                    classes.Testimonies__Group__Testimony__Bottom__Image
                  }
                >
                  <Image
                    src={testimony.Photo.data.attributes.url}
                    alt={testimony.Photo.data.attributes.alternativeText}
                    fill
                  />
                </div>
                <div
                  className={
                    classes.Testimonies__Group__Testimony__Bottom__Info
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
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Testimonies;
