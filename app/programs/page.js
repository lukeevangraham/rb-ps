import { fetchAPI, getGlobalInfo } from "@/lib/api";
import QueryString from "qs";
import Layout from "@/components/UI/Layout/Layout";
import Sections from "@/components/Sections/Sections";
import ClassList from "@/components/School/ClassList/ClassList";

import classes from "./page.module.scss";
import { sectionQuery } from "@/lib/api";

const programsDataQuery = QueryString.stringify({
  populate: "*",
});

const homeDataQuery = QueryString.stringify({
  populate: {
    Sections: sectionQuery,
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs?${programsDataQuery}`, { next: { revalidate: 0 } }),
    fetchAPI(`/ps-home?${homeDataQuery}`, { next: { revalidate: 0 } }),
    ,
  ]);

  return res;
};

const Programs = async () => {
  const [globalData, programsData, homeData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className={classes.Programs}>
        <div className={`row u-padding-y-large`}>
          <h1>Our Programs</h1>
          {homeData.data.attributes.Sections.filter(
            (section) => section.Heading === "Our Programs"
          ).map((section) => (
            <Sections sectionData={section} key={section.id} />
          ))}
          <h2>Preschool</h2>
          {programsData.data.map((program) => (
            <div className={classes.Programs__Program} key={program.id}>
              <h3>{program.attributes.Title}</h3>
              <div>
                For children who turn {program.attributes.Title[0]}-years-old{" "}
                <u>
                  {" "}
                  <em> on or before</em> September 1,{" "}
                  {program.attributes.schoolYearBeginning}
                </u>
              </div>
              <ClassList program={program} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Programs;