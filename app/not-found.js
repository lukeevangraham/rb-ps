import Layout from "@/components/UI/Layout/Layout";
import { getGlobalInfo } from "@/lib/api";

const getData = async () => {
  const res = await Promise.all([getGlobalInfo()]);

  return res;
};

const NotFound = async () => {
  const [globalData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className="row u-padding-y-large">
        <h1 style={{ marginBottom: "0" }}>We can not find this page</h1>
      </main>
    </Layout>
  );
};

export default NotFound;
