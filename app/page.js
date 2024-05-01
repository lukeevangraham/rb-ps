import Image from "next/image";
import { getGlobalInfo } from "../lib/api";
import Layout from "@/components/UI/Layout/Layout";

const getData = async () => {
  const res = await getGlobalInfo();

  return res.data.attributes;
};

export default async function Home() {
  const globalData = await getData();

  return (
    <Layout global={globalData}>
      <main>
        <p>Hello world, testing
          {/* {console.log("GD: ", globalData)} */}
          </p>
      </main>
    </Layout>
  );
}
