import Layout from "@/components/UI/Layout/Layout";
import { getGlobalInfo } from "@/lib/api";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    {
      next: { revaldate: 0 },
    },
  ]);

  return res;
};

const Tour = async () => {
  const [globalData] = await getData();
  return (
    <Layout global={globalData.data.attributes}>
      <div className={classes.Tour}>Tour</div>
    </Layout>
  );
};

export default Tour;
