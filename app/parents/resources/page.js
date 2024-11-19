import QueryString from "qs";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Link from "next/link";

import classes from "./page.module.scss";

const resourcesQuery = QueryString.stringify({
  fields: ["id"],
  populate: {
    HelpfulResources: { populate: "*" },
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-parent?${resourcesQuery}`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export const metadata = {
  title: "Helpful Resources",
  description:
    "Discover valuable resources for RBCPC Preschool parents, including educational websites, community support, safety tips, and emergency preparedness. Access tools to enhance your child's learning and well-being.",
  openGraph: {
    title: "Helpful Resources",
    description:
      "Discover valuable resources for RBCPC Preschool parents, including educational websites, community support, safety tips, and emergency preparedness. Access tools to enhance your child's learning and well-being.",
  },
};

const Resources = async () => {
  const [globalData, parentData] = await getData();
  return (
    <Layout global={globalData.data.attributes}>
      <main className={`u-padding-y-large ${classes.Resources}`}>
        <h1>Resources</h1>
        <div className="u-max-width-p">
          <div className="row">
            <h2>Websites</h2>
            {parentData.data.attributes.HelpfulResources.map((link) => (
              <div key={link.id}>
                <a href={link.url} target="_blank">
                  {link.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Resources;
