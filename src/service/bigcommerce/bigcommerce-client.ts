export const bigcommerceClient = async (
  method: string,
  path: string,
  searchParams: Record<string, string> = {},
  body: Record<string | number, any> = {},
) => {
  const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
  const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

  if (!storeHash) {
    throw new Error("BIGCOMMERCE_STORE_HASH is not set.");
  }

  if (!accessToken) {
    throw new Error("BIGCOMMERCE_ACCESS_TOKEN is not set.");
  }

  const apiBaseUrl =
    path.startsWith("/v2/") || path.startsWith("/v3/")
      ? `https://api.bigcommerce.com/stores/${storeHash}`
      : `https://api.bigcommerce.com/stores/${storeHash}/v3`;

  const fetchConfig: RequestInit = {
    method,
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Auth-Token": accessToken,
    },
  };

  if (method === "POST" || method === "PUT") {
    fetchConfig.body = JSON.stringify(body);
  }

  const url = new URL(path, "https://a");
  for (const key in searchParams) {
    url.searchParams.set(key, searchParams[key]);
  }

  const fullUrl = `${apiBaseUrl}${url.pathname}${url.search}`;
  const response = await fetch(fullUrl, fetchConfig);

  try {
    return response.json();
  } catch (error) {
    return response.text();
  }
};

export default bigcommerceClient;
