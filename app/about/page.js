import QueryString from "qs";
import Layout from "@/components/UI/Layout/Layout";
import { fetchAPI, getGlobalInfo } from "@/lib/api";
import Sections from "@/components/Sections/Sections";
import Image from "next/image";

import classes from "./page.module.scss";

const aboutDataQuery = QueryString.stringify({
  populate: {
    Sections: { populate: "*" },
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-about?${aboutDataQuery}`, {
      next: { revalidate: 0 },
    }),
    fetchAPI(`/ps-staffs?populate=*`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export default async function AboutUs() {
  const [globalData, aboutData, staffData] = await getData();

  const renderStaffMember = (member) => (
    <div key={member.id} className={classes.About__Staff__Group__Member}>
      <div className={classes.About__Staff__Group__Member__Image}>
        <Image src={member.attributes.Image.data.attributes.url} fill />
        <div className={classes.About__Staff__Group__Member__BottomBar}>
          <h5>
            {member.attributes.FirstName} {member.attributes.LastName}
          </h5>
          <div>{member.attributes.Title}</div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout global={globalData.data.attributes}>
      <div className={`${classes.About} u-padding-y-large`}>
        <div className="row">
          <h1>About Us</h1>
        </div>
        {aboutData.data.attributes.Sections.map((section, index) => (
          <>
            <Sections sectionData={section} key={index} />
          </>
        ))}
        {console.log("SD: ", staffData.data[0])}
      </div>
      <section className={`${classes.About__Staff} u-padding-y-large`}>
        <div>
          <h2>Staff</h2>
        </div>
        <h3>Administration Staff Member Profiles</h3>
        <div className={`${classes.About__Staff__Group} row`}>
          {staffData.data
            .filter((member) => member.attributes.AdminStaffMember)
            .map((member) => renderStaffMember(member))}
        </div>
        <div>
          <h3>Teaching Staff Member Profiles</h3>
          <div className={classes.About__Staff__Group}>
            {staffData.data
              .filter((member) => member.attributes.AdminStaffMember !== true)
              .map((member) => renderStaffMember(member))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
