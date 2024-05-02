import Image from "next/image";
import { fetchAPI, getGlobalInfo } from "../lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Sections from "@/components/Sections/Sections";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-home?populate[Sections][populate]=*`, {
      next: { revalidate: 60 },
    }),
  ]);

  return res;
};

export default async function Home() {
  const [globalData, homeData] = await getData();

  console.log("HD: ", homeData.data.attributes);

  return (
    <Layout global={globalData.data.attributes}>
      <main>
        {homeData.data.attributes.Sections.map((section, index) => (
          <Sections sectionData={section} key={index} />
        ))}
        <div
          style={{ backgroundColor: "#2B523B", height: "50rem", color: "#eee" }}
        >
          lorem ipsum
        </div>
      </main>
    </Layout>
  );
}
