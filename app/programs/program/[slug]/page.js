"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getAllClassSlugs,
  getGlobalInfo,
  fetchAPI,
  getClassData,
} from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import ClassList from "@/components/School/ClassList/ClassList";

import classes from "./page.module.scss";

export async function getStaticPaths() {
  const paths = await getAllClassSlugs();
  console.log("Paths: ", paths);
  return {
    paths,
    fallback: true,
  };
}

const getData = async (params) => {
  const res = await Promise.all([getGlobalInfo(), getClassData(params.slug)]);

  return res;
};

export default function ClassOption({ params }) {
  const [globalData, setGlobalData] = useState(null);
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    getData(params).then((res) => {
      setGlobalData(res[0]);
      setClassData(res[1]);
    });
  }, [params]);

  const router = useRouter();

  console.log("CD: ", classData);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const renderClassTimes = (oldTime, increment) => {
    const startTime = new Date();
    startTime.setHours(oldTime.split(":")[0], oldTime.split(":")[1]);

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + increment);
    return (
      <td
        className={classes.ClassOption__Classes__Class__Time}
      >{`${startTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })} - ${endTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`}</td>
    );
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      {globalData && globalData.data ? (
        <Layout global={globalData.data.attributes}>
          <main className={`${classes.ClassOption} u-padding-y-large`}>
            <div className="row">
              <h1>{classData.attributes.Title}</h1>
              <h2>Classes</h2>
              <ClassList program={classData} />
              {/* <div className={classes.ClassOption__Classes}>
                <div> </div>
                <div> </div>
                <div> </div>
                <div>Annual Tuition</div>
                <div>Ten Equal Payments of</div>

                {classData.attributes.Class.map((item) => (
                  <>
                    <div
                      key={item.id}
                      className={classes.ClassOption__Classes__Class}
                    >
                      {item.dayOfWeek}
                    </div>
                    <div>{`${item.dailyClassHours} hours -- ${item.numberOfDaysPerWeek}x a week`}</div>
                    {renderClassTimes(item.startTime, item.dailyClassHours)}
                    <div>{`$${numberWithCommas(item.annualTuition)}`}</div>
                    <div>{`$${numberWithCommas(item.annualTuition / 10)}`}</div>
                  </>
                ))}
              </div> */}
            </div>
          </main>
        </Layout>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
