import config from '../config';

const graphQLQuery = async (queryTemplate, values) => {
  // If a value object is provided, let's replace template content
  // with these values
  if (values) {
    Object.keys(values).forEach(key => {
      queryTemplate = queryTemplate.replace('$' + key, typeof values[key] === 'number' ? values[key] : '"' + values[key] + '"');
    });
  }

  // Build up HTTP request
  var opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: queryTemplate })
  };

  // Execute and return request promise
  let response = await fetch(config.serverApiUrl, opts);

  return response.json();
};

export const queryData = async (queryTemplate, values) => {
  return graphQLQuery(queryTemplate, values);
};

export const mutateData = async (mutationTemplate, values) => {
  return graphQLQuery(mutationTemplate, values);
};

const api = {
  queryData,
  mutateData
};

export default api;