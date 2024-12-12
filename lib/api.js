import QueryString from "qs";
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

// export async function getAllClassSlugs() {
//   const res = await fetchAPI(`/ps-programs`);

//   console.log("RES: ", res);

//   return res.data.map((program) => {
//     return {
//       params: {
//         slug: program.attributes.slug,
//       },
//     };
//   });
// }

// export async function getClassData(slug) {
//   const query = qs.stringify({
//     filters: {
//       slug: {
//         $eq: slug,
//       },
//     },
//     populate: "*",
//   });

//   const classData = await fetchAPI(`/ps-programs?${query}`);

//   // make sure we found something, otherwise return null
//   if (classData == null || classData.length === 0) {
//     return null;
//   }

//   // Return the first item since there should only be one result per slug
//   return classData.data[0];
// }

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
    "section.image-beside-text": { populate: "*" },
  },
};

export const preschoolProgramsQuery = QueryString.stringify({
  populate: {
    preschoolPrograms: { populate: "*" },
  },
});

export const parentAndChildQuery = QueryString.stringify({
  populate: {
    parentAndChildPrograms: { populate: "*" },
  },
});

export const extendedDayOptionsQuery = QueryString.stringify({
  populate: {
    extendedDayOptions: { populate: "*" },
  },
});

export const programsDataQuery = QueryString.stringify({
  populate: {
    preschoolPrograms: { populate: "*" },
    parentAndChildPrograms: { populate: "*" },
    extendedDayOptions: { populate: "*" },
  },
});
