"use client";

import QueryString from "qs";
import { useState, useEffect } from "react";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import ClassList from "../ClassList/ClassList";
import Image from "next/image";

import classes from "./PreschoolClass.module.scss";

const preschoolQuery = QueryString.stringify({
  populate: {
    preschoolPrograms: { populate: "*" },
  },
});

const getData = async (params) => {
  const res = await Promise.all([
    getGlobalInfo(),
    // fetchAPI(`/ps-programs-st?${preschoolQuery}`),
    fetchAPI(`/ps-programs-st?populate[preschoolPrograms][populate]=*`),
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
          {console.log("PD: ", programData)}
          <main className={classes.Program}>
            <div className="u-padding-y-large">
              <div className="row">
                <div className={classes.Program__Top}>
                  <div className={classes.Program__Top__Words}>
                    <h1 className="u-max-width-p">{programData.Title}</h1>
                    <div
                      className={`u-max-width-p`}
                      dangerouslySetInnerHTML={{ __html: programData.Overview }}
                    />
                  </div>
                  <div className={classes.Program__Top__Image}>
                    <Image
                      src={programData.Image.data[0].attributes.url}
                      alt={programData.Image.data[0].attributes.alternativeText}
                      fill
                    />
                  </div>
                </div>
              </div>
            </div>
            <section
              className={`u-padding-y-large ${classes.Program__ClassList}`}
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
            <section className="u-padding-y-large u-max-width-p">
              <div className="row">
                <div
                  className={classes.Program__Details}
                  dangerouslySetInnerHTML={{ __html: programData.Details }}
                />
              </div>
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
