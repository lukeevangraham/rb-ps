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

const Tuition = async () => {
  const [globalData, tuitionData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className={classes.Tuition}>
        <div className={`row u-padding-y-large`}>
          <h1>Tuition</h1>
          {tuitionData.data.attributes.Sections.map((section, index) => (
            <>
              <Sections sectionData={section} key={index} />
            </>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Tuition;
