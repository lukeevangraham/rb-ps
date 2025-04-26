import Layout from "@/components/UI/Layout/Layout";
import { fetchAPI, getGlobalInfo } from "@/lib/api";
import ContactForm from "@/components/School/ContactForm/ContactForm";

import classes from "./page.module.scss";

const getData = async () => {
  const res = await Promise.all([getGlobalInfo()]);

  return res;
};

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with RBCPC Preschool for inquiries about programs, enrollment, or general questions. Contact details include address, phone, email, and office hours, with a convenient form for direct communication.",
  openGraph: {
    title: "Contact",
    description:
      "Get in touch with RBCPC Preschool for inquiries about programs, enrollment, or general questions. Contact details include address, phone, email, and office hours, with a convenient form for direct communication.",
    type: "website",
    url: "/about/contact",
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

const Contact = async () => {
  const [globalData] = await getData();

  return (
    <>
      <Layout global={globalData.data.attributes}>
        <main className="u-padding-y-large">
          <div class="row">
            <h1>Contact Us</h1>

            <div className={classes.Form}>
              <ContactForm />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Contact;
