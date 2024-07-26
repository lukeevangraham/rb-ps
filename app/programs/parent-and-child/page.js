import QueryString from "qs";
import Layout from "@/components/UI/Layout/Layout";
import { getGlobalInfo, fetchAPI, parentAndChildQuery } from "@/lib/api";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs-st?${parentAndChildQuery}`),
  ]);
  return res;
};

const ParentAndChild = async () => {
  const [globalData, parentAndChildData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <div>
        {console.log(
          "P&D: ",
          parentAndChildData.data.attributes.parentAndChildPrograms
        )}
        <h1>Parent And Child</h1>
      </div>
    </Layout>
  );
};

export default ParentAndChild;
