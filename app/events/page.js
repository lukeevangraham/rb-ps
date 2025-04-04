import QueryString from "qs";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import HeadingAboveCards from "@/components/Sections/HeadingAboveCards/HeadingAboveCards";
import Image from "next/image";

import classes from "./page.module.scss";
import { cache } from "react";

// const eventsQuery = QueryString.stringify({
//   populate: { Image: { populate: "*" } },
// });

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-events?populate=*`, { cache: "no-cache" }),
  ]);

  return res;
};

export const metadata = {
  title: "Events",
  description:
    "​The RBCPC Preschool Events page provides information on upcoming activities and special events for preschool families, such as the Annual Preschool Art Show, Craft Fair and more.",
  openGraph: {
    title: "Events",
    description:
      "​The RBCPC Preschool Events page provides information on upcoming activities and special events for preschool families, such as the Annual Preschool Art Show, Craft Fair and more.",
  },
};

const Events = async () => {
  const [globalData, eventsData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className={`u-padding-y-large ${classes.Events}`}>
        <div className="row">
          {/* {console.log("E: ", eventsData.data[0].attributes)} */}
          <h1>Events</h1>
          <div className={classes.Events__Group}>
            {eventsData.data.map((event) => (
              <div key={event.id} className={classes.Events__Group__Event}>
                <div className={classes.Events__Group__Event__Date}>
                  <div className={classes.Events__Group__Event__Date__Start}>
                    <div>
                      {new Date(
                        event.attributes.StartDate.replace(/-/g, "/")
                      ).toLocaleDateString("en-US", { day: "2-digit" })}
                    </div>
                    <div>
                      {new Date(
                        event.attributes.StartDate.replace(/-/g, "/")
                      ).toLocaleDateString("en-US", { month: "short" })}
                    </div>
                  </div>
                  <div>
                    <div>-</div>
                  </div>
                  <div className={classes.Events__Group__Event__Date__End}>
                    <div>
                      {new Date(
                        event.attributes.EndDate.replace(/-/g, "/")
                      ).toLocaleDateString("en-US", { day: "2-digit" })}
                    </div>
                    <div>
                      {new Date(
                        event.attributes.EndDate.replace(/-/g, "/")
                      ).toLocaleDateString("en-US", { month: "short" })}
                    </div>
                  </div>
                </div>
                <div className={classes.Events__Group__Event__Info}>
                  <h4>{event.attributes.Name}</h4>
                  <div className={classes.Events__Group__Event__Info__Subhead}>
                    <div
                      className={
                        classes.Events__Group__Event__Info__Subhead__Time
                      }
                    >
                      <svg>
                        <use xlinkHref="../images/sprite.svg#icon-clock" />{" "}
                      </svg>
                      <div
                        className={
                          classes.Events__Group__Event__Info__Subhead__Time__MobileOnly
                        }
                      >
                        {new Date(
                          event.attributes.StartDate
                        ).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div
                        className={
                          classes.Events__Group__Event__Info__Subhead__Time__MobileOnly
                        }
                      >
                        {new Date(
                          event.attributes.StartDate
                        ).toLocaleDateString("en-US", { day: "numeric" })}
                      </div>
                      <div
                        className={
                          classes.Events__Group__Event__Info__Subhead__Time__MobileOnly
                        }
                      >
                        -
                      </div>
                      <div
                        className={
                          classes.Events__Group__Event__Info__Subhead__Time__MobileOnly
                        }
                      >
                        {new Date(event.attributes.EndDate).toLocaleDateString(
                          "en-US",
                          { month: "short" }
                        )}
                      </div>
                      <div
                        className={
                          classes.Events__Group__Event__Info__Subhead__Time__MobileOnly
                        }
                      >
                        {new Date(event.attributes.EndDate).toLocaleDateString(
                          "en-US",
                          { day: "numeric" }
                        )}
                        ,
                      </div>
                      <div>{event.attributes.Time}</div>
                    </div>
                    <div>
                      <svg>
                        <use xlinkHref="../images/sprite.svg#icon-map-pin-alt" />{" "}
                      </svg>
                      <div>{event.attributes.Location}</div>
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: event.attributes.Description,
                    }}
                  />
                </div>
                {event.attributes.Image.data.length ? (
                  <div className={classes.Events__Group__Event__Images}>
                    {event.attributes.Image.data.map((image) => (
                      <div
                        className={classes.Events__Group__Event__Images__Image}
                        key={image.id}
                      >
                        <Image
                          key={image.id}
                          src={image.attributes.url}
                          alt={image.attributes.alternativeText}
                          fill
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={classes.Events__Group__Event__Image}>
                    <Image
                      src={event.attributes.Image.data[0].attributes.url}
                      alt={
                        event.attributes.Image.data[0].attributes
                          .alternativeText
                      }
                      fill
                    />
                  </div>
                )}

                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: event.attributes.Description,
                  }}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Events;
