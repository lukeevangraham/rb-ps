import QueryString from "qs";
import Link from "next/link";
import Layout from "@/components/UI/Layout/Layout";
import ClassList from "@/components/School/ClassList/ClassList";
import { getGlobalInfo, fetchAPI } from "@/lib/api";

import classes from "./page.module.scss";

const preschoolQuery = QueryString.stringify({
  populate: {
    preschoolPrograms: { populate: "*" },
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs-st?${preschoolQuery}`, { next: { revalidate: 0 } }),
  ]);

  return res;
};

const Preschool = async () => {
  const [globalData, preschoolData] = await getData();

  const schoolYearBeginning = preschoolData.data.attributes.schoolYearBeginning;

  return (
    <Layout global={globalData.data.attributes}>
      <main className={classes.Preschool}>
        <div className="row u-padding-y-large">
          <h1>Preschool</h1>
          {preschoolData.data.attributes.preschoolPrograms.map((program) => (
            <div className={classes.Preschool__Program} key={program.id}>
              <div className="row">
                <Link href={`/programs/preschool/${program.id}`}>
                  <h3>{program.Title}</h3>
                </Link>
                <p>
                  For children who turn {program.Title[0]}-years-old{" "}
                  <u>
                    {" "}
                    <em> on or before</em> September 1, {schoolYearBeginning}
                  </u>
                </p>
              </div>
              <ClassList program={program} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Preschool;
