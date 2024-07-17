import { fetchAPI, getGlobalInfo } from "@/lib/api";
import QueryString from "qs";
import Layout from "@/components/UI/Layout/Layout";
import Sections from "@/components/Sections/Sections";

import classes from "./page.module.scss";

const programsDataQuery = QueryString.stringify({
  populate: "*",
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs?${programsDataQuery}`),
    { next: { revalidate: 0 } },
  ]);

  return res;
};

const Programs = async () => {
  const [globalData, programsData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      {console.log("P: ", programsData.data)}Programs
    </Layout>
  );
};

export default Programs;
