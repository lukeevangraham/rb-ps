import QueryString from "qs";
import Image from "next/image";
import { getGlobalInfo, fetchAPI, parentAndChildQuery } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import ParentAndChildClassList from "./ParentAndChildClassList/ParentAndChildClassList";

import classes from "./ParentAndChildClass.module.scss";

// const parentAndChildQuery = QueryString.stringify({
//   populate: {
//     parentAndChildPrograms: { populate: "*" },
//   },
// });

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    // fetchAPI(`/ps-programs-st?${parentAndChildQuery}`),
    fetchAPI(`/ps-programs-st?populate[parentAndChildPrograms][populate]=*`),
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
      <main className={`${classes.ParentAndChildClass}`}>
        <div className="u-padding-y-large">
          <div className="row">
            <div className={classes.ParentAndChildClass__Top}>
              <div className={classes.ParentAndChildClass__Top__Words}>
                <h1 className="u-max-width-p">{parentAndChildData.Title}</h1>
                <div
                  className={`u-max-width-p`}
                  dangerouslySetInnerHTML={{
                    __html: parentAndChildData.Overview,
                  }}
                />
              </div>
              <div className={classes.ParentAndChildClass__Top__Image}>
                {parentAndChildData.image.data ? (
                  <Image
                    src={parentAndChildData.image.data[0].attributes.url}
                    alt={
                      parentAndChildData.image.data[0].attributes
                        .alternativeText
                    }
                    fill
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <ParentAndChildClassList program={parentAndChildData} />
      </main>
    </Layout>
  );
};

export default ParentAndChildClass;
