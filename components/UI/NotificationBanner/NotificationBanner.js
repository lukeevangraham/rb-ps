// import useSessionStorage from "@/lib/hooks/useSessionStorage";

import classes from "./NotificationBanner.module.scss";

const NotificationBanner = ({ content }) => {
  // const [showBanner, setShowBanner] = useState(true);

  // const handleClose = () => {
  //   setShowBanner(false);
  //   localStorage.setItem('showBanner', 'true')
  // };

  // const notifcation = useSessionStorage('banner')

  // console.log("SB: ", localStorage.getItem('showBanner'));

  console.log("C: ", content);

  return (
    <div className={classes.NotificationBanner}>
      {content.map((link, index) => (
        <div key={index}>
          <a href={link.url} target={link.newTab ? "__blank" : "null"}>
            {link.text}
          </a>
        </div>
      ))}
    </div>
  );
};

export default NotificationBanner;
