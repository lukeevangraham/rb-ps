import NavigationItem from "./Navigation Item/Navigation Item";

const NavigationItems = ({ links, button }) => (
  <>
    {links.map((link) => (
      <NavigationItem key={link.id} item={link} />
    ))}
  </>
);

export default NavigationItems;
