import QueryString from "qs";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import ParentAndChildClassList from "./ParentAndChildClassList/ParentAndChildClassList";

import classes from "./ParentAndChildClass.module.scss";

const parentAndChildQuery = QueryString.stringify({
  populate: {
    parentAndChildPrograms: { populate: "*" },
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs-st?${parentAndChildQuery}`),
  ]);

  return res;
};

const ParentAndChildClass = async ({ id }) => {
  const [globalData, programsData] = await getData();

  const parentAndChildData =
    programsData.data.attributes.parentAndChildPrograms.filter(
      (program) => program.id == id
    )[0];

  return (
    <Layout global={globalData.data.attributes}>
      <main className={classes.ParentAndChildClass}>
        <div className="u-padding-y-medium">
          <h1>{parentAndChildData.Title}</h1>
          <div
            className={`u-max-width-p`}
            dangerouslySetInnerHTML={{ __html: parentAndChildData.Overview }}
          />
        </div>
          <ParentAndChildClassList program={parentAndChildData} />
      </main>
    </Layout>
  );
};

export default ParentAndChildClass;
