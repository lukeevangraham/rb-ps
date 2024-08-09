import QueryString from "qs";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";

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

const Calendar = async () => {
  const [globalData, parentData] = await getData();
  return (
    <Layout global={globalData.data.attributes}>
      <main className="u-padding-y-large">
        <h1>Calendar</h1>
        <div className="row">
          <object
            data={
              parentData.data.attributes.CalendarItems.data[0].attributes.url
            }
            type="application/pdf"
            style={{ width: "100%", height: "50vh", border: "none" }}
          />
        </div>
      </main>
    </Layout>
  );
};

export default Calendar;
