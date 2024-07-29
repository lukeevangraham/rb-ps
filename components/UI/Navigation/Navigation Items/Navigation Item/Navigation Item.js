import Link from "next/link";

const NavigationItem = ({ item, parentsClicked, setParentsClicked }) => {
  return (
    <li>
      {item.url == "/parents" ? (
        <a href="#">
          <div onClick={() => setParentsClicked(!parentsClicked)}>
            {item.text}
          </div>
        </a>
      ) : (
        <Link href={item.url}>{item.text}</Link>
      )}
    </li>
  );
};

export default NavigationItem;
