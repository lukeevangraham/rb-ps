import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([getGlobalInfo()]);

  return res;
};

const Events = async () => {
  const [globalData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className={`u-padding-y-large ${classes.Events}`}>
        <div className="row">
          <h1>Events</h1>
        </div>
      </main>
    </Layout>
  );
};

export default Events;
