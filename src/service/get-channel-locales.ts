import graphqlClient from "./bigcommerce/graphql-client";
import { graphql, ResultOf } from "gql.tada";

let locales: string[] | undefined = undefined;

const LocalesQuery = graphql(`
  query GetLocales($channelId: ID!) {
    store {
      locales(input: { channelId: $channelId }) {
        edges {
          node {
            code
            isDefault
          }
        }
      }
    }
  }
`);

const getChannelLocales = async (): Promise<string[]> => {
  if (locales === undefined) {
    const channelId = process.env.BIGCOMMERCE_CHANNEL_ID;
    if (!channelId) {
      throw new Error("BIGCOMMERCE_CHANNEL_ID is not set.");
    }

    type LocalesResult = ResultOf<typeof LocalesQuery>;
    const res: { data: LocalesResult } = await graphqlClient(LocalesQuery, {
      channelId: `bc/store/channel/${channelId}`,
    });

    // Return the locale codes. The default locale is the first one.
    locales = res.data.store.locales.edges
      .map((e: Node) => e.node)
      .sort((a: Node) => {
        return a.isDefault ? -1 : 1;
      })
      .map((e: any) => e.code);
  }

  if (!locales?.length) {
    throw new Error("Failed to get locales.");
  }

  return locales;
};

export default getChannelLocales;
