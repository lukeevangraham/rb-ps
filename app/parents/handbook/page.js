import QueryString from "qs";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Button from "@/components/UI/Button/Button";

import classes from "./page.module.scss";

const handbookQuery = QueryString.stringify({
  fields: ["ParentHandbookTopInfo"],
  populate: {
    HandbookItems: { populate: "*" },
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-parent?${handbookQuery}`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

export const metadata = {
  title: "Parent Handbook",
  description:
    "Access the RBCPC Preschool Parent Handbook for essential guidelines, policies, and resources. Explore helpful links to documents covering snacks, schedules, and the complete handbook to ensure a smooth experience for you and your child.",
  openGraph: {
    title: "Parent Handbook",
    description:
      "Access the RBCPC Preschool Parent Handbook for essential guidelines, policies, and resources. Explore helpful links to documents covering snacks, schedules, and the complete handbook to ensure a smooth experience for you and your child.",
    url: "/parents/handbook",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dzekujbym/image/upload/v1745624911/rbcpc_Prechool_OG_6efb2b8eec.jpg?updated_at=2025-04-25T23:48:31.780Z",
        width: 1200,
        height: 630,
        alt: "RBCPC Preschool",
      },
    ],
  },
};

const ParentHandbook = async () => {
  const [globalData, parentData] = await getData();
  return (
    <Layout global={globalData.data.attributes}>
      <main className={`u-padding-y-large ${classes.Handbook}`}>
        <div className="row">
          <h1>Parent Handbook</h1>
          <div className="u-max-width-p">
            <div
              dangerouslySetInnerHTML={{
                __html: parentData.data.attributes.ParentHandbookTopInfo,
              }}
            />
          </div>
          <div className={classes.Handbook__Items}>
            {parentData.data.attributes.HandbookItems.data.map((item) => (
              <div key={item.id}>
                <Button
                  button={{
                    newTab: true,
                    text: item.attributes.name,
                    url: item.attributes.url,
                  }}
                />{" "}
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ParentHandbook;
