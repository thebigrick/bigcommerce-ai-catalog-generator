const batchPromise = async <TData>(
  promises: Promise<TData>[],
  batchSize: number,
): Promise<TData[]> => {
  const results: TData[] = [];
  let index = 0;

  while (index < promises.length) {
    const batch = promises.slice(index, index + batchSize);
    results.push(...(await Promise.all(batch)));
    index += batchSize;
  }

  return results;
};

export default batchPromise;
