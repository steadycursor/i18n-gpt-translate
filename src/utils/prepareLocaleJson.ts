import fs from "fs/promises";

export const prepareLocaleJson = async (args: { path: string }) => {
  const data = await fs.readFile(args.path, "utf-8").then((content) => {
    try {
      return JSON.parse(content);
    } catch {
      return {};
    }
  });

  const { flatten } = await import("flat");

  const flattenData = flatten(data) as any;

  const keys = Object.keys(flattenData);

  return { keys, data: flattenData };
};
