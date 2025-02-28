export const thehiveClient = async (
  method: string,
  path: string,
  searchParams: Record<string, string> = {},
  body: Record<string | number, any> = {},
) => {
  const apiKey = process.env.THE_HIVE_AI_API_KEY;

  if (!apiKey) {
    throw new Error("THE_HIVE_AI_API_KEY is not set.");
  }
  2;
  const apiBaseUrl = "https://api.thehive.ai/api/v3";

  const fetchConfig: RequestInit = {
    method,
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
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
  return response.json();
};

export default thehiveClient;
