
export const multiParams = (paramsObj = {query: {text: 'Japan'}}) => {

  const params = new URLSearchParams();
  const keys = Object.keys(paramsObj)
  keys.forEach(key => {
    let item = paramsObj[key];
    if (typeof item === Object) {
      item = multiParams(item);
    }
    params.append(key, item);
  });
  return params.toString();
};