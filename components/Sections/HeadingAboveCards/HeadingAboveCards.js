import Image from "next/image";

import classes from "./HeadingAboveCards.module.scss";

const HeadingAboveCards = ({ data }) => (
  <section className={`u-padding-y-large ${classes.Programs}`}>
    <div className="row">
      <h2>{data.Heading}</h2>

      <div className={classes.Programs__Group}>
        {data.Cards.map((card) => (
          <div className={classes.Programs__Group__Program} key={card.id}>
            <div className={classes.Programs__Group__Program__Top}>
              <div className={classes.Programs__Group__Program__Top__Image}>
                <Image
                  src={card.Image.data.attributes.url}
                  alt={card.Image.data.attributes.alternativeText}
                  fill
                />
              </div>
              <div className={classes.Programs__Group__Program__Top__Text}>
                <h5>{card.Heading}</h5>
              </div>
            </div>
            <div
              className={classes.Programs__Group__Program__Body}
              dangerouslySetInnerHTML={{ __html: card.TopInfo }}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeadingAboveCards;
