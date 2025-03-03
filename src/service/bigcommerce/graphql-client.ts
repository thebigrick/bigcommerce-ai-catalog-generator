import { DocumentDecoration } from "gql.tada";
import { DocumentNode, print } from "@0no-co/graphql.web";

export function normalizeQuery(
  query: string | DocumentNode | DocumentDecoration<any, any>,
) {
  if (typeof query === "string") {
    return query;
  }

  if (query instanceof String) {
    return query.toString();
  }

  if ("kind" in query) {
    return print(query);
  }

  throw new Error("Invalid query type");
}

export const graphqlClient = async <TResult, TVariables>(
  document: DocumentDecoration<TResult, TVariables>,
  variables?: TVariables,
) => {
  const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
  const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

  const query = normalizeQuery(document);

  if (!storeHash) {
    throw new Error("BIGCOMMERCE_STORE_HASH is not set.");
  }

  if (!accessToken) {
    throw new Error("BIGCOMMERCE_ACCESS_TOKEN is not set.");
  }

  const body = JSON.stringify({
    query,
    variables,
  });

  const apiBaseUrl = `https://api.bigcommerce.com/stores/${storeHash}/graphql`;

  const fetchConfig: RequestInit = {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Auth-Token": accessToken,
    },
    body,
  };

  const response = await fetch(apiBaseUrl, fetchConfig);

  try {
    return await response.json();
  } catch (error) {
    return await response.text();
  }
};

export default graphqlClient;
