import { Options } from "../types";

const getSearchParansObject = (url: string) => {
  if (!url) {
    return {
      origin: "",
      searchParams: {},
    };
  }

  try {
    const urlInstance = new URL(url);
    const searchParams = {};

    for (const [key, value] of urlInstance.searchParams.entries()) {
      searchParams[key] = value;
    }

    return {
      origin: urlInstance.origin,
      searchParams,
    };
  } catch (error) {
    return {
      origin: url,
      searchParams: {},
    };
  }
};

const formatUrl = (config: Options) => {
  const { baseURL = "", url = "", params = {} } = config;

  const baseURLInstance = getSearchParansObject(baseURL);
  const urlInstance = getSearchParansObject(url);

  const mergeSearch = new URLSearchParams({
    ...baseURLInstance.searchParams,
    ...urlInstance.searchParams,
    ...params,
  }).toString();

  if (mergeSearch) {
    return `${baseURLInstance.origin}${urlInstance.origin}?${mergeSearch}`;
  } else {
    return `${baseURLInstance.origin}${urlInstance.origin}`;
  }
};

export default formatUrl;
