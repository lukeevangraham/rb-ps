"use client";

import QueryString from "qs";
import { useState, useEffect } from "react";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import ClassList from "../ClassList/ClassList";

import classes from "./PreschoolClass.module.scss"

const preschoolQuery = QueryString.stringify({
  populate: {
    preschoolPrograms: { populate: "*" },
  },
});

const getData = async (params) => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs-st?${preschoolQuery}`),
  ]);

  return res;
};

const PreschoolClass = ({ id }) => {
  const [globalData, setGlobalData] = useState(null);
  const [programData, setProgramData] = useState(null);
  const [preschoolData, setPreschoolData] = useState(null);

  useEffect(() => {
    getData(id).then((res) => {
      setGlobalData(res[0]);
      setProgramData(
        res[1].data.attributes.preschoolPrograms.filter(
          (program) => program.id == id
        )[0]
      );
      setPreschoolData(res[1].data.attributes);
    });
  }, [id]);

  return (
    <>
      {globalData && globalData.data ? (
        <Layout global={globalData.data.attributes}>
          <main className={classes.Program}>
            <div className="u-padding-y-medium">
              <h1>{programData.Title}</h1>
              <div
                className={classes.Program__Overview}
                dangerouslySetInnerHTML={{ __html: programData.Overview }}
              />
            </div>
            <section
              className={`u-padding-y-medium ${classes.Program__ClassList}`}
            >
              <div className="row">
                <h3>
                  Our program offerings for{" "}
                  {`${preschoolData.schoolYearBeginning}/${
                    preschoolData.schoolYearBeginning + 1
                  }`}
                </h3>
                <ClassList program={programData} />
              </div>
            </section>
            <section className="u-padding-y-medium u-max-width-p">
              <div dangerouslySetInnerHTML={{ __html: programData.Details }} />
            </section>
          </main>
        </Layout>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default PreschoolClass;
