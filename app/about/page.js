// "use client";

// import { useState, useEffect } from "react";
import QueryString from "qs";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/UI/Layout/Layout";
import Button from "@/components/UI/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import { fetchAPI, getGlobalInfo, sectionQuery } from "@/lib/api";
import Sections from "@/components/Sections/Sections";
import UserImageDefault from "@/components/UI/UserImageDefault/UserImageDefault";

import classes from "./page.module.scss";

const aboutDataQuery = QueryString.stringify({
  populate: {
    Sections: sectionQuery,
  },
});

const staffsQuery = QueryString.stringify({
  populate: { Image: { populate: "*" } },
  sort: ["LastName:asc"],
  pagination: { pageSize: 50 },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-about?${aboutDataQuery}`, {
      next: { revalidate: 0 },
    }),
    fetchAPI(`/ps-staffs?${staffsQuery}`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export const metadata = {
  title: "About",
  description:
    "Learn about RBCPC Preschool's philosophy of celebrating individuality, fostering community, and sharing God's love. Discover their mission, values, and dedicated staff who nurture academic, social, and spiritual growth for children and families.",
  openGraph: {
    title: "About",
    description:
      "Learn about RBCPC Preschool's philosophy of celebrating individuality, fostering community, and sharing God's love. Discover their mission, values, and dedicated staff who nurture academic, social, and spiritual growth for children and families.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "../images/rbcpcPreschoolOG.jpg",
        width: 1200,
        height: 630,
        alt: "RBCPC Preschool",
      },
    ],
  },
};

export default async function AboutUs() {
  const [globalData, aboutData, staffData] = await getData();
  // const [showModal, setShowModal] = useState(false);
  // const [globalData, setGlobalData] = useState(null);
  // const [aboutData, setAboutData] = useState(null);
  // const [staffData, setStaffData] = useState(null);

  // useEffect(() => {
  //   getData().then(function (res) {
  //     setGlobalData(res[0]);
  //     setAboutData(res[1]);
  //     setStaffData(res[2]);
  //   });
  // }, []);

  const renderStaffMember = (member) => (
    <div key={member.id} className={classes.About__Staff__Group__Member}>
      <div className={classes.About__Staff__Group__Member__Image}>
        <div className={classes.About__Staff__Group__Member__Image__Overlay} />
        {member.attributes.Image.data ? (
          <Image
            src={member.attributes.Image.data.attributes.url}
            fill
            alt={
              member.attributes.Image.data.alternativeText
                ? member.attributes.Image.data.alternativeText
                : `Photo of ${member.attributes.FirstName} ${member.attributes.LastName}`
            }
          />
        ) : (
          <UserImageDefault />
        )}

        {/* <Link href={`/staff/${member.id}`}> */}
        <Button
          button={{
            url: `/staff/${member.id}`,
            text: "More info",
            // clicked: () => setShowModal(member),
            fromAbout: true,
          }}
        />
        {/* </Link> */}
      </div>
      <div className={classes.About__Staff__Group__Member__BottomBar}>
        <h5>
          {member.attributes.FirstName} {member.attributes.LastName}
        </h5>
        <div>{member.attributes.Title}</div>
      </div>
      {/* <div className={classes.About__Staff__Group__Member__Bio}>
        {member.attributes.Bio}
      </div> */}
    </div>
  );

  return (
    <>
      {globalData && globalData.data ? (
        <Layout global={globalData.data.attributes}>
          {/* {renderModal} */}
          <div className={`${classes.About} u-padding-y-large`}>
            <div className="row">
              <h1>About Us</h1>
            </div>
            <div id="Philosophy" className={classes.About__Philosophy}>
              {aboutData.data.attributes.Sections.map((section, index) => (
                <Sections sectionData={section} key={index} />
              ))}
            </div>
          </div>
          <section
            className={`${classes.About__Staff} u-padding-y-large`}
            id="OurStaff"
          >
            <div>
              <h2>Staff</h2>
            </div>
            <h3>Administration Staff Member Profiles</h3>
            <div className={`${classes.About__Staff__Group} row`}>
              {staffData.data.length
                ? staffData.data
                    .filter((member) => member.attributes.AdminStaffMember)
                    .reverse()
                    .map((member) => renderStaffMember(member))
                : null}
            </div>
            <div>
              <h3>Teaching Staff Member Profiles</h3>
              <div className={`${classes.About__Staff__Group}`}>
                {staffData.data.length
                  ? staffData.data
                      .filter(
                        (member) => member.attributes.AdminStaffMember !== true
                      )
                      .map((member) => renderStaffMember(member))
                  : null}
              </div>
            </div>
          </section>
          {/* <section className="u-padding-y-large">
            <div className="row">

            <h2>Frequently Asked Questions</h2>
            </div>
          </section> */}
        </Layout>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
