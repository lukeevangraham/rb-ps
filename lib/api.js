import qs from "qs";

export const getStrapiURL = (path = "") => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || null}${path}`;
};

export async function fetchAPI(path, options) {
  const requestURL = getStrapiURL(path);
  const res = await fetch(requestURL, options);
  const data = await res.json();
  return data;
}

export const getGlobalInfo = async () => {
  const globalQuery = qs.stringify({ populate: { Navbar: { populate: "*" } } });

  const data = await fetchAPI(`/ps-global?${globalQuery}`);

  return data;
};

export const sectionQuery = {
  on: {
    "section.fa-qs": { populate: "*" },
    "section.heading-above-columns": {
      populate: { Column: { populate: "*" } },
    },
    "section.heading-above-button": { populate: "*" },
    "section.hero": { populate: "*" },
    "section.heading-above-cards": {
      populate: { Cards: { populate: "*" } },
    },
    "section.rich-text": { populate: "*" },
    "section.testimonies": { populate: { Testimony: { populate: "*" } } },
    "section.video-beside-text": { populate: "*" },
  },
};
