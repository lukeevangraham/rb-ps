import { fetchAPI, getGlobalInfo } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Sections from "@/components/Sections/Sections";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-home?populate=*`),
    { next: { revalidate: 0 } },
  ]);

  return res;
};

const Programs = async () => {
  const [globalData, homeData] = await getData();

  return <Layout global={globalData.data.attributes}>Programs</Layout>;
};

export default Programs;
