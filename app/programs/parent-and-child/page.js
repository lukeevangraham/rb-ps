import QueryString from "qs";
import Layout from "@/components/UI/Layout/Layout";
import ParentAndChildClassList from "@/components/School/ParentAndChildClass/ParentAndChildClassList/ParentAndChildClassList";
import Link from "next/link";
import { getGlobalInfo, fetchAPI, parentAndChildQuery } from "@/lib/api";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([
    getGlobalInfo(),
    fetchAPI(`/ps-programs-st?${parentAndChildQuery}`),
  ]);
  return res;
};

export const metadata = {
  title: "Parent & Child Class Options",
  description:
    "Join RBCPC Preschool's Parent and Child Classes to foster early learning and bonding with your 1- or 2-year-old. Explore fun, interactive sessions offered in fall and spring, designed for parents and toddlers to grow together.",
  openGraph: {
    title: "Parent & Child Class Options",
    description:
      "Join RBCPC Preschool's Parent and Child Classes to foster early learning and bonding with your 1- or 2-year-old. Explore fun, interactive sessions offered in fall and spring, designed for parents and toddlers to grow together.",
    url: "/programs/parent-and-child",
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

const ParentAndChild = async () => {
  const [globalData, parentAndChildData] = await getData();

  return (
    <Layout global={globalData.data.attributes}>
      <main className={`u-padding-y-large ${classes.ParentAndChild}`}>
        <div className="row">
          <h1>Parent And Child Class Options</h1>
        </div>
        <div className={classes.ParentAndChild__Programs}>
          {parentAndChildData.data.attributes.parentAndChildPrograms.map(
            (program) => (
              <div className="row" key={program.id}>
                <div className={classes.ParentAndChild__Programs__Program}>
                  <h3>
                    <Link href={`./parent-and-child/${program.id}`}>
                      {program.Title}
                    </Link>
                  </h3>
                  {/* <div dangerouslySetInnerHTML={{ __html: program.Overview }} /> */}

                  <ParentAndChildClassList program={program} />
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </Layout>
  );
};

export default ParentAndChild;
