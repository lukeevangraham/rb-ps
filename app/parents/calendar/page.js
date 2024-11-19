import QueryString from "qs";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";

import classes from "./page.module.scss";

const calendaryQuery = QueryString.stringify({
  fields: ["id"],
  populate: {
    CalendarItems: { populate: "*" },
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-parent?${calendaryQuery}`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export const metadata = {
  title: "Calendar",
  description:
    "Stay updated with RBCPC Preschool's calendar of events, important dates, and activities. Access a comprehensive schedule designed to keep parents informed and engaged in their child's educational journey.",
  openGraph: {
    title: "Calendar",
    description:
      "Stay updated with RBCPC Preschool's calendar of events, important dates, and activities. Access a comprehensive schedule designed to keep parents informed and engaged in their child's educational journey.",
  },
};

const Calendar = async () => {
  const [globalData, parentData] = await getData();
  return (
    <Layout global={globalData.data.attributes}>
      <main className={`u-padding-y-large ${classes.Calendar}`}>
        <h1>Calendar</h1>
        <div className="row">
          {/* <embed
            src={
              parentData.data.attributes.CalendarItems.data[0].attributes.url
            }
            style={{ width: "100%", height: "50vh", border: "none" }}
          /> */}
          <iframe
            src={`https://docs.google.com/viewerng/viewer?url=${parentData.data.attributes.CalendarItems.data[0].attributes.url}&embedded=true`}
            frameBorder="0"
          />
        </div>
      </main>
    </Layout>
  );
};

export default Calendar;
