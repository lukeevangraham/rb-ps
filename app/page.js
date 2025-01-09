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
  description:
    "Discover RBCPC Preschool, a nurturing environment that fosters academic, social, and spiritual growth for children aged 1-5. Offering parent-and-child classes, preschool programs, and extended care options, we celebrate each child's uniqueness while building community and sharing God's love.",
  openGraph: {
    description:
      "Discover RBCPC Preschool, a nurturing environment that fosters academic, social, and spiritual growth for children aged 1-5. Offering parent-and-child classes, preschool programs, and extended care options, we celebrate each child's uniqueness while building community and sharing God's love.",
  },
};

export default async function Home() {
  const [globalData, homeData, programsData] = await getData();

  // console.log("HD: ", homeData.data.attributes.Sections);

  return (
    <Layout global={globalData.data.attributes}>
      <main className={classes.Home}>
        {homeData.data.attributes.NotificationBannerLinks ? (
          <NotificationBanner
            content={homeData.data.attributes.NotificationBannerLinks}
          />
        ) : null}

        {homeData.data.attributes.Sections.map((section, index) => (
          <div key={index}>
            <Sections
              sectionData={section}
              keyData={index}
              fromProgramsPage={programsData.data.attributes}
            />
          </div>
        ))}
      </main>
    </Layout>
  );
}
