"use client";

import { useState, useEffect } from "react";
import QueryString from "qs";
import Image from "next/image";
import Layout from "@/components/UI/Layout/Layout";
import Button from "@/components/UI/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import { fetchAPI, getGlobalInfo, sectionQuery } from "@/lib/api";
import Sections from "@/components/Sections/Sections";

import classes from "./page.module.scss";

const aboutDataQuery = QueryString.stringify({
  populate: {
    Sections: sectionQuery,
  },
});

const staffsQuery = QueryString.stringify({
  populate: { Image: { populate: "*" } },
  sort: ["LastName:asc"],
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

export default function AboutUs() {
  // const [globalData, aboutData, staffData] = await getData();
  const [showModal, setShowModal] = useState(false);
  const [globalData, setGlobalData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    getData().then(function (res) {
      setGlobalData(res[0]);
      setAboutData(res[1]);
      setStaffData(res[2]);
    });
  }, []);

  const renderStaffMember = (member) => (
    <div key={member.id} className={classes.About__Staff__Group__Member}>
      <div className={classes.About__Staff__Group__Member__Image}>
        <div className={classes.About__Staff__Group__Member__Image__Overlay} />
        <Image
          src={member.attributes.Image.data.attributes.url}
          fill
          alt={
            member.attributes.Image.data.alternativeText
              ? member.attributes.Image.data.alternativeText
              : `Photo of ${member.attributes.FirstName} ${member.attributes.LastName}`
          }
        />
        <Button
          button={{
            url: null,
            text: "More info",
            clicked: () => setShowModal(member),
            fromAbout: true,
          }}
        />
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

  const renderModal = showModal ? (
    <Modal show={showModal} modalClosed={() => setShowModal(false)}>
      <div className={classes.StaffModal}>
        <div>
          <h3>
            {showModal.attributes.FirstName} {showModal.attributes.LastName}
          </h3>
          <h5>{showModal.attributes.Title}</h5>
          <h6>
            {" "}
            <a href={`mailto:${showModal.attributes.Email}`}>
              {showModal.attributes.Email}
            </a>
          </h6>
          <p>{showModal.attributes.Bio}</p>
          {console.log("M: ", showModal)}
        </div>
        <div className={classes.StaffModal__Image}>
          <Image
            src={showModal.attributes.Image.data.attributes.url}
            alt={
              showModal.attributes.Image.data.alternativeText
                ? showModal.attributes.Image.data.alternativeText
                : `Photo of ${showModal.attributes.FirstName} ${showModal.attributes.LastName}`
            }
            width={285}
            height={300}
          />
        </div>
      </div>
    </Modal>
  ) : null;

  return (
    <>
      {globalData && globalData.data ? (
        <Layout global={globalData.data.attributes}>
          {renderModal}
          <div className={`${classes.About} u-padding-y-large`}>
            <div className="row">
              <h1>About Us</h1>
            </div>
            <div id="Philosophy">
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
              {staffData.data
                .filter((member) => member.attributes.AdminStaffMember)
                .map((member) => renderStaffMember(member))}
            </div>
            <div>
              <h3>Teaching Staff Member Profiles</h3>
              <div className={classes.About__Staff__Group}>
                {staffData.data
                  .filter(
                    (member) => member.attributes.AdminStaffMember !== true
                  )
                  .map((member) => renderStaffMember(member))}
              </div>
            </div>
          </section>
        </Layout>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
