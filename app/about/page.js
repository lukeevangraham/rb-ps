import QueryString from "qs";
import Layout from "@/components/UI/Layout/Layout";
import { fetchAPI, getGlobalInfo } from "@/lib/api";
import Sections from "@/components/Sections/Sections";

import classes from "./page.module.scss";

const aboutDataQuery = QueryString.stringify({
  populate: {
    Sections: { populate: "*" },
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-about?${aboutDataQuery}`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export default async function AboutUs() {
  const [globalData, aboutData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <div className="row">
        <div className={`${classes.About} u-padding-y-large`}>
          <h1>About Us</h1>
        </div>
      </div>
      {aboutData.data.attributes.Sections.map((section, index) => (
        <>
          <Sections sectionData={section} key={index} />
        </>
      ))}
      {console.log("AD: ", aboutData.data.attributes.Sections)}
    </Layout>
  );
}
