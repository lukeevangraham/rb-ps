import qs from "qs";
import { fetchAPI, getGlobalInfo, sectionQuery } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Sections from "@/components/Sections/Sections";

import classes from "./page.module.scss";

const tuitionDataQuery = qs.stringify({
  //   populate: "*"
  populate: {
    Sections: sectionQuery,
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-tuition?${tuitionDataQuery}`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export const metadata = {
  title: "Tuition",
  description:
    "Explore tuition details for RBCPC Preschool, including the Electronic Fund Withdrawal Form and scholarship opportunities. Learn about financial assistance for eligible families and key deadlines for applications.",
  openGraph: {
    title: "Tuition",
    description:
      "Explore tuition details for RBCPC Preschool, including the Electronic Fund Withdrawal Form and scholarship opportunities. Learn about financial assistance for eligible families and key deadlines for applications.",
  },
};

const Tuition = async () => {
  const [globalData, tuitionData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className={`${classes.Tuition} u-padding-y-large`}>
        <h1>Tuition</h1>
        {tuitionData.data.attributes.Sections.map((section, index) => (
          <div key={index}>
            <Sections sectionData={section} key={index} />
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default Tuition;
