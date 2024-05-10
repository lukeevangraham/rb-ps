import classes from "./HeadingAboveCards.module.scss";

const HeadingAboveCards = ({ data }) => (
  <section className="u-padding-y-large">
    <div className="row">
      <div className={classes.HeadingAboveCards}>
        <h2>{data.Heading}</h2>
        <div className={classes.HeadingAboveCards__Group}>
          {data.Testimony.map((testimony) => (
            <div
              key={testimony.id}
              className={classes.HeadingAboveCards__Group__Card}
            >
              <p>{testimony.Statement}</p>
              <div className={classes.HeadingAboveCards__Group__Card__Bottom}>
                <div
                  className={
                    classes.HeadingAboveCards__Group__Card__Bottom__Image
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
                    classes.HeadingAboveCards__Group__Card__Bottom__Info
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

export default HeadingAboveCards;
