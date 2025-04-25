import qs from "qs";
import Image from "next/image";
import Link from "next/link";
import {
  fetchAPI,
  getGlobalInfo,
  sectionQuery,
  programsDataQuery,
} from "../lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Sections from "@/components/Sections/Sections";
import NotificationBanner from "@/components/UI/NotificationBanner/NotificationBanner";

import classes from "./page.module.scss";

const homeDataQuery = qs.stringify({
  populate: {
    Sections: sectionQuery,
    NotificationBannerLinks: { populate: "*" },
  },
  // populate: {
  //   Sections: { populate: "*" },
  // },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-home?${homeDataQuery}`, {
      // fetchAPI(`/ps-home?populate=*`, {
      next: { revalidate: 0 },
    }),
    fetchAPI(`/ps-programs-st?${programsDataQuery}`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export const metadata = {
  title: "Nurturing Growth Through Faith & Play",
  description:
    "RBCPC Preschool fosters academic, social, and spiritual growth for ages 1–5 with classes, extended care, and a loving, faith-based community.",
  openGraph: {
    description:
      "RBCPC Preschool fosters academic, social, and spiritual growth for ages 1–5 with classes, extended care, and a loving, faith-based community.",

    url: "/",
    images: [
      {
        url: "../images/rbcpcPreschoolOG.jpg",
        width: 1200,
        height: 630,
        alt: "RBCPC Preschool",
      },
    ],
    type: "website",
  },
};

export default async function Home() {
  const [globalData, homeData, programsData] = await getData();

  // console.log("HD: ", homeData.data.attributes.Sections);

  return (
    <Layout global={globalData.data.attributes}>
      {homeData.data.attributes.NotificationBannerLinks ? (
        <NotificationBanner
          content={homeData.data.attributes.NotificationBannerLinks}
        />
      ) : null}
      <main className={classes.Home}>
        {homeData.data.attributes.Sections.map((section, index) => (
          <div key={index}>
            <Sections
              sectionData={section}
              keyData={index}
              fromProgramsPage={programsData.data.attributes}
              fromHome={true}
            />
          </div>
        ))}
      </main>
    </Layout>
  );
}
