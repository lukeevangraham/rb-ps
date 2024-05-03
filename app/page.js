import qs from "qs";
import Image from "next/image";
import { fetchAPI, getGlobalInfo } from "../lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Sections from "@/components/Sections/Sections";

import classes from "./page.module.scss";

const homeDataQuery = qs.stringify({
  populate: {
    Sections: { populate: "*" }
  }
})

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    // fetchAPI(`/ps-home?populate[Sections][populate]=*`, {
    fetchAPI(`/ps-home?populate[Sections][populate]=*`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export default async function Home() {
  const [globalData, homeData] = await getData();

  // console.log("HD: ", homeData.data.attributes);

  return (
    <Layout global={globalData.data.attributes}>
      <main className={classes.Home}>
        {homeData.data.attributes.Sections.map((section, index) => (
          <Sections sectionData={section} key={index} />
        ))}
        {/* <div
          style={{
            backgroundColor: "#2B523B",
            height: "50rem",
            color: "#eee",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <video
              src={
                "https://player.vimeo.com/progressive_redirect/playback/940916372/rendition/360p/file.mp4?loc=external&log_user=0&signature=f23ad4cb7d86ba61edeea9ee0e3fb22461a4a7f7f8241f0c445533085dde266f"
              }
              width={600}
              height={300}
              controls
            />
          </div>
          <p>We want the best for our kids.</p>
        </div> */}
      </main>
    </Layout>
  );
}
