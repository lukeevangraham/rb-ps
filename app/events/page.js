import QueryString from "qs";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import HeadingAboveCards from "@/components/Sections/HeadingAboveCards/HeadingAboveCards";

import classes from "./page.module.scss";

const eventsQuery = QueryString.stringify({
  populate: { Image: { populate: "*" } },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-events?${eventsQuery}`),
  ]);

  return res;
};

const Events = async () => {
  const [globalData, eventsData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className={`u-padding-y-large ${classes.Events}`}>
        <div className="row">
          <h1>Events</h1>
          <div className={classes.Events__Group}>
            {eventsData.data.map((event) => (
              <div key={event.id}>
                <h4>{event.attributes.Name}</h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: event.attributes.Description,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Events;
