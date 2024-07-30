// import { Lato } from "next/font/google";
import Modal from "../Modal/Modal";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import NavigationItems from "../Navigation/Navigation Items/Navigation Items";
import Footer from "../Navigation/Footer/Footer";

import classes from "./Layout.module.scss";

// const lato = Lato({
//   weight: "400",
//   subsets: ["latin"],
//   variable: '--font-lato',
//   display: "swap",
// });

const Layout = ({ global, children }) => (
  <>
    {/* <Modal show /> */}
    <div className={classes.Layout}>
      <Toolbar global={global}>
        <NavigationItems
          links={global.Navbar.Links}
          button={global.Navbar.Button}
        />
      </Toolbar>
      <div className={classes.Layout__Main}>
        {children}

        <Footer global={global} />
      </div>
    </div>
  </>
);

export default Layout;
