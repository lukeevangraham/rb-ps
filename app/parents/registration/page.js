import QueryString from "qs";
import { getGlobalInfo, fetchAPI } from "@/lib/api";
import Layout from "@/components/UI/Layout/Layout";
import Button from "@/components/UI/Button/Button";

import classes from "./page.module.scss";

const registrationQuery = QueryString.stringify({
  fields: ["RegistrationPacketTopInfo"],
  populate: {
    RegistrationItems: { populate: "*" },
  },
});

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-parent?${registrationQuery}`, {
      next: { revalidate: 0 },
    }),
  ]);

  return res;
};

const Registration = async () => {
  const [globalData, parentData] = await getData();
  return (
    <Layout global={globalData.data.attributes}>
      <main className={`u-padding-y-large ${classes.Registration}`}>
        <h1>Registration</h1>
        <div className="row">
          <div
            dangerouslySetInnerHTML={{
              __html: parentData.data.attributes.RegistrationPacketTopInfo,
            }}
          />

          <div className={classes.Registration__Items}>
            {parentData.data.attributes.RegistrationItems.data.map((item) => (
              <div key={item.id}>
                <h4>{item.attributes.caption}</h4>
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

export default Registration;
