import { fetchAPI, getGlobalInfo, programsDataQuery } from "@/lib/api";
import QueryString from "qs";
import Layout from "@/components/UI/Layout/Layout";
import Sections from "@/components/Sections/Sections";
import HeadingAboveCards from "@/components/Sections/HeadingAboveCards/HeadingAboveCards";
import ClassList from "@/components/School/ClassList/ClassList";

import classes from "./page.module.scss";
import { sectionQuery } from "@/lib/api";

const homeDataQuery = QueryString.stringify({
  populate: {
    Sections: sectionQuery,
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),

    fetchAPI(`/ps-home?${homeDataQuery}`, { next: { revalidate: 0 } }),
    fetchAPI(`/ps-programs-st?${programsDataQuery}`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export const metadata = {
  title: "Programs",
  description:
    "Explore RBCPC Preschool's diverse programs, including parent-and-child classes for ages 1-3, preschool for ages 2-5, and options like extended days and early drop-off. Tailored to support early learning and growth.",
  openGraph: {
    title: "Programs",
    description:
      "Explore RBCPC Preschool's diverse programs, including parent-and-child classes for ages 1-3, preschool for ages 2-5, and options like extended days and early drop-off. Tailored to support early learning and growth.",
  },
};

const Programs = async () => {
  const [globalData, homeData, programsData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className={classes.Programs}>
        <div className={`row u-padding-y-large`}>
          <h1>Our Programs</h1>
          {/* {console.log("PD: ", programsData.data.attributes)} */}
          {/* {console.log("HD: ", homeData.data.attributes.Sections)} */}
          {homeData.data.attributes.Sections.filter(
            (section) => section.Heading === "Our Programs"
          ).map((section) => (
            <Sections
              sectionData={section}
              keyData={section.id}
              fromProgramsPage={programsData.data.attributes}
              key={section.id}
            />
          ))}

          {/* <h2>Testing</h2> */}
          {/* <HeadingAboveCards data={null} /> */}

          {/* <h2>Preschool</h2>
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
          ))} */}
        </div>
      </main>
    </Layout>
  );
};

export default Programs;
