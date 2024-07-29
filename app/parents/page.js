import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";

const getData = async () => {
  const res = await Promise.all([getGlobalInfo()]);

  return res;
};

const Parents = async () => {
  const [globalData] = await getData();
  return (
    <Layout global={globalData.data.attributes}>
      <div>
        <div>Parent Handbook</div>
        <div>Calendar & Dates</div>
        <div>Registration Packets</div>
        <div>Helpful Resources</div>
      </div>
    </Layout>
  );
};

export default Parents;
