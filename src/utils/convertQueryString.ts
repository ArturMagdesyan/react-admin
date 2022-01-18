export const convertQueryString = (queryParams: any) => {
  const queryString = Object.keys(queryParams)
    .map((key) => (
      queryParams[key] !== null ? `${key}=${queryParams[key]}` : `${key}=`
    ))
    .join('&');

  return queryString.replace(/[^=&]+=(?:&|$)/g, '');
};

export default convertQueryString;
