import Layout from "@/components/UI/Layout/Layout";
import { fetchAPI, getGlobalInfo } from "@/lib/api";
import ContactForm from "@/components/School/ContactForm/ContactForm";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([getGlobalInfo()]);

  return res;
};

const Contact = async () => {
  const [globalData] = await getData();

  return (
    <>
      <Layout global={globalData.data.attributes}>
        <main className="row u-padding-y-large">
          <h1>Contact Us</h1>
          <div className={classes.Form}>
            <ContactForm />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Contact;
