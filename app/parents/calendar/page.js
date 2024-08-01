import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";

const getData = async () => {
  const res = await Promise.all([getGlobalInfo(), fetchAPI(`/ps-parent`, {
    next: { revalidate: 0 },
  })]);

  return res;
};

const Calendar = async () => {
  const [globalData, parentData] = await getData();
  return (
    <Layout global={globalData.data.attributes}>
      <main className="u-padding-y-large">
        <h1>Calendar</h1>
        {console.log("PD: ", parentData)}
      </main>
    </Layout>
  );
};

export default Calendar;
