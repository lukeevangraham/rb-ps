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
