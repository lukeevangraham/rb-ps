// import { Lato } from "next/font/google";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import NavigationItems from "../Navigation/Navigation Items/Navigation Items";
import Footer from "../Navigation/Footer/Footer";

// const lato = Lato({
//   weight: "400",
//   subsets: ["latin"],
//   variable: '--font-lato',
//   display: "swap",
// });

const Layout = ({ global, children }) => (
  <>
    <Toolbar global={global}>
      <NavigationItems
        links={global.Navbar.Links}
        button={global.Navbar.Button}
      />
    </Toolbar>
    {children}
    <Footer />
  </>
);

export default Layout;
