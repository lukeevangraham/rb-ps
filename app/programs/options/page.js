import { getGlobalInfo, fetchAPI, extendedDayOptionsQuery } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import OutdoorList from "@/components/School/OutdoorList/OutdoorList";
import Link from "next/link";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs-st?${extendedDayOptionsQuery}`),
  ]);
  return res;
};

export const metadata = {
  title: "Extended Day Options",
  description:
    "Learn about RBCPC Preschool's Extended Day options, including 6-hour classes, Lunch Bunch, and Early Drop-Off services. Flexible programs support busy schedules while enhancing the preschool experience for children.",
  openGraph: {
    title: "Extended Day Options",
    description:
      "Learn about RBCPC Preschool's Extended Day options, including 6-hour classes, Lunch Bunch, and Early Drop-Off services. Flexible programs support busy schedules while enhancing the preschool experience for children.",
  },
};

const Options = async () => {
  const [globalData, optionsData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <div className={`u-padding-y-large ${classes.Options}`}>
        <h1>Enrichment</h1>
        <div className="row">
          <div className={`${classes.Options__Option}`}>
            <h3>
              <Link href={`./options/OutdoorClassroom`}>
                {optionsData.data.attributes.OutdoorClassroom.Name}
              </Link>
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  optionsData.data.attributes.OutdoorClassroom.Description,
              }}
            />
            <OutdoorList
              data={
                optionsData.data.attributes.OutdoorClassroom
                  .OutdoorClassroomSession
              }
            />
          </div>
          {optionsData.data.attributes.extendedDayOptions.map((option) => (
            <div key={option.id} className={` ${classes.Options__Option}`}>
              <h3>
                <Link href={`./options/${option.id}`}>{option.Name}</Link>
              </h3>
              <div dangerouslySetInnerHTML={{ __html: option.Summary }} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Options;
