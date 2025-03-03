import restClient from "./rest-client";

const getCategoryTreeId = async () => {
  const res = await restClient("GET", "/catalog/trees");
  const channelId = parseInt(process.env.BIGCOMMERCE_CHANNEL_ID || "0", 10);

  if (!channelId) {
    throw new Error("BIGCOMMERCE_CHANNEL_ID is not set.");
  }

  const myChannelTree = res.data.find((tree: any) =>
    tree.channels.includes(channelId),
  );

  if (!myChannelTree) {
    throw new Error("Could not find any category tree for the channel.");
  }

  return myChannelTree.id;
};

export default getCategoryTreeId;
