import QueryString from "qs";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import HeadingAboveCards from "@/components/Sections/HeadingAboveCards/HeadingAboveCards";
import Image from "next/image";

import classes from "./page.module.scss";

// const eventsQuery = QueryString.stringify({
//   populate: { Image: { populate: "*" } },
// });

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-events?populate=*`),
  ]);

  return res;
};

export const metadata = {
  title: "Events",
  // description:
  //   "Learn about RBCPC Preschool's philosophy of celebrating individuality, fostering community, and sharing God's love. Discover their mission, values, and dedicated staff who nurture academic, social, and spiritual growth for children and families.",
  openGraph: {
    title: "Events",
    // description:
    //   "Learn about RBCPC Preschool's philosophy of celebrating individuality, fostering community, and sharing God's love. Discover their mission, values, and dedicated staff who nurture academic, social, and spiritual growth for children and families.",
  },
};

const Events = async () => {
  const [globalData, eventsData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className={`u-padding-y-large ${classes.Events}`}>
        <div className="row">
          <h1>Events</h1>
          {console.log("E: ", eventsData.data[0].attributes)}
          <div className={classes.Events__Group}>
            {eventsData.data.map((event) => (
              <div key={event.id} className={classes.Events__Group__Event}>
                <div className={classes.Events__Group__Event__Date}>
                  <div className={classes.Events__Group__Event__Date__Day}>
                    {new Date(event.attributes.StartDate).toLocaleDateString(
                      "en-US",
                      { day: "2-digit" }
                    )}
                  </div>
                  <div className={classes.Events__Group__Event__Date__Month}>
                    {new Date(event.attributes.StartDate).toLocaleDateString(
                      "en-US",
                      { month: "short" }
                    )}
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
                <div className={classes.Events__Group__Event__Image}>
                  <Image
                    src={event.attributes.Image.data.attributes.url}
                    alt={event.attributes.Image.data.attributes.alternativeText}
                    fill
                  />
                </div>

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
