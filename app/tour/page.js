import Layout from "@/components/UI/Layout/Layout";
import Button from "@/components/UI/Button/Button";
import TourForm from "@/components/School/Tour/TourForm";
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
      <div className="u-padding-y-large">
        <div className="row">
          <h1>Schedule a tour!</h1>
          <TourForm />
        </div>
      </div>
    </Layout>
  );
};

export default Tour;
