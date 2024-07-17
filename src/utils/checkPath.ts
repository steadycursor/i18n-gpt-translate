import fs from "fs/promises";

type CheckPathArgs = {
  source: string;
};

export const checkPath = async ({ source }: CheckPathArgs) => {
  const doesExists = fs
    .access(source)
    .then(() => true)
    .catch(() => false);

  return doesExists;
};
