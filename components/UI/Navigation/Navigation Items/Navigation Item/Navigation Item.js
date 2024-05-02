import Link from "next/link";

const NavigationItem = ({ item }) => (
  <li>
    <Link href={item.url}>{item.text}</Link>
  </li>
);

export default NavigationItem;
