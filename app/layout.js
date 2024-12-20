import { Lato } from "next/font/google";
import Link from "next/link";

import "../styles/globals.scss";

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata = {
  title: {
    default: "RBCPC Preschool",
    template: "%s - RBCPC Preschool",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en">
      <body className={lato.variable}>
        {children}
        {modal}
      </body>
    </html>
  );
}
