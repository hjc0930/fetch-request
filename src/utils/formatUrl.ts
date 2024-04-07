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
      origin: urlInstance.origin + urlInstance.pathname,
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
  const { basicUrl = "", url = "", params = {} } = config;

  const basicUrlInstance = getSearchParansObject(basicUrl);
  const urlInstance = getSearchParansObject(url);

  const mergeSearch = new URLSearchParams({
    ...basicUrlInstance.searchParams,
    ...urlInstance.searchParams,
    ...params,
  }).toString();

  if (mergeSearch) {
    return `${basicUrlInstance.origin}${urlInstance.origin}?${mergeSearch}`;
  } else {
    return `${basicUrlInstance.origin}${urlInstance.origin}`;
  }
};

export default formatUrl;
