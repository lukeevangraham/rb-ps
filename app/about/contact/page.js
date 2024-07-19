import Layout from "@/components/UI/Layout/Layout";
import { fetchAPI, getGlobalInfo } from "@/lib/api";

const getData = async () => {
  const res = await Promise.all([getGlobalInfo()]);

  return res;
};

const Contact = async () => {
  const [globalData] = await getData();

  console.log("GD: ", globalData);

  return (
    <>
      <Layout global={globalData.data.attributes}>
        <main className="row u-padding-y-large">
          <h1>Contact Us</h1>
        </main>
      </Layout>
    </>
  );
};

export default Contact;
