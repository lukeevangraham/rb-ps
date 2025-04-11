import React from "react";
import Layout from "@/components/UI/Layout/Layout";
import OutdoorList from "@/components/School/OutdoorList/OutdoorList";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Image from "next/image";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(
      `/ps-programs-st?populate[OutdoorClassroom][populate]=*&populate[OutdoorClassroom][Image][populate]=*`
    ),
  ]);

  return res;
};

export const metadata = {
  title: "Outdoor Classroom",
  description:
    "The Outdoor Classroom at RBCPC Preschool offers hands-on learning experiences for children enrolled in the 3's or 4/5's classes, allowing them to explore their outdoor environment. Session times are listed here and include Lunch Bunch. Families can sign up for multiple sessions during online registration.",
  openGraph: {
    title: "Outdoor Classroom",
    description:
      "The Outdoor Classroom at RBCPC Preschool offers hands-on learning experiences for children enrolled in the 3's or 4/5's classes, allowing them to explore their outdoor environment. Session times are listed here and include Lunch Bunch. Families can sign up for multiple sessions during online registration.",
  },
};

const OutdoorClassroom = async () => {
  const [globalData, outdoorClassroomData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main>
        <section className="u-padding-y-large">
          <div className="row">
            <div className={classes.OutdoorClassroom__Top}>
              <div className={classes.OutdoorClassroom__Top__Words}>
                <h1 className="u-max-width-p">
                  {outdoorClassroomData.data.attributes.OutdoorClassroom.Name}
                </h1>
                <div
                  className="u-max-width-p"
                  dangerouslySetInnerHTML={{
                    __html:
                      outdoorClassroomData.data.attributes.OutdoorClassroom
                        .Description,
                  }}
                />
              </div>
              <div className={classes.OutdoorClassroom__Top__Image}>
                <Image
                  src={
                    outdoorClassroomData.data.attributes.OutdoorClassroom.Image
                      .data.attributes.url
                  }
                  alt={
                    outdoorClassroomData.data.attributes.OutdoorClassroom.Image
                      .data.attributes.alternativeText
                      ? outdoorClassroomData.data.attributes.OutdoorClassroom
                          .Image.data.attributes.alternativeText
                      : "Kids enjoying our outdoor classrooom"
                  }
                  fill
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className={`u-padding-y-large ${classes.OutdoorClassroom__ClassList}`}
        >
          <div className="row">
            <h3>
              Our programs offerings for{" "}
              {`${outdoorClassroomData.data.attributes.schoolYearBeginning}/${
                outdoorClassroomData.data.attributes.schoolYearBeginning + 1
              }`}
            </h3>
            <OutdoorList
              data={
                outdoorClassroomData.data.attributes.OutdoorClassroom
                  .OutdoorClassroomSession
              }
            />
            {/* <div className={classes.OutdoorClassroom__ClassList__List}>
              <div
                className={classes.OutdoorClassroom__ClassList__List__Heading}
              ></div>
              <div
                className={classes.OutdoorClassroom__ClassList__List__Heading}
              ></div>
              <div
                className={classes.OutdoorClassroom__ClassList__List__Heading}
              ></div>
              <div
                className={classes.OutdoorClassroom__ClassList__List__Heading}
              >
                Mon./Wed.
              </div>
              <div
                className={classes.OutdoorClassroom__ClassList__List__Heading}
              >
                Tue. only
              </div>
              {outdoorClassroomData.data.attributes.OutdoorClassroom.OutdoorClassroomSession.map(
                (item, index) => (
                  <React.Fragment key={item.id}>
                    <div
                      className={
                        classes.OutdoorClassroom__ClassList__List__Body
                      }
                    >
                      Session {index + 1}
                    </div>
                    <div
                      className={
                        classes.OutdoorClassroom__ClassList__List__Body
                      }
                    >
                      {new Date(
                        item.StartDate.replace(/-/g, "/").replace(/T.+/, "")
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(
                        item.EndDate.replace(/-/g, "/").replace(/T.+/, "")
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div
                      className={
                        classes.OutdoorClassroom__ClassList__List__Body
                      }
                    >
                      {`(${item.WeeksOfClass} weeks of class /${item.ClassDays} class days)`}
                    </div>
                    <div
                      className={
                        classes.OutdoorClassroom__ClassList__List__Body
                      }
                    >
                      ${item.ClassDays.split(" or ")[0] * 25}
                    </div>
                    <div
                      className={
                        classes.OutdoorClassroom__ClassList__List__Body
                      }
                    >
                      ${item.ClassDays.split(" or ")[1] * 25}
                    </div>
                  </React.Fragment>
                )
              )}
            </div> */}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default OutdoorClassroom;
