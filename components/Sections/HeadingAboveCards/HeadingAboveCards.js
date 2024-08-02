import Image from "next/image";
import Link from "next/link";

import classes from "./HeadingAboveCards.module.scss";

const renderProgramLinks = (program, group) => (
  <li key={program.id}>
    <Link href={`/programs/${group.group}/${program.id}`}>
      {program.Title ? program.Title : program.Name}
    </Link>
  </li>
);

const HeadingAboveCards = ({ data, fromProgramsPage, keyData }) => (
  <section className={`u-padding-y-large ${classes.Programs}`} key={keyData}>
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
            {fromProgramsPage ? (
              <div className={classes.Programs__Group__Program__Body}>
                <ul>
                  {card.Heading === "Preschool"
                    ? fromProgramsPage.preschoolPrograms.map((program) =>
                        renderProgramLinks(program, {
                          group: "preschool",
                        })
                      )
                    : card.Heading.includes("Parent And Child")
                    ? fromProgramsPage.parentAndChildPrograms.map((program) =>
                        renderProgramLinks(program, {
                          group: "parent-and-child",
                        })
                      )
                    : card.Heading.includes("Options")
                    ? fromProgramsPage.extendedDayOptions.map((program) =>
                        renderProgramLinks(program, {
                          group: "options",
                        })
                      )
                    : null}
                </ul>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeadingAboveCards;
