import fs from "fs/promises";

type GetDirectoriesArgs = {
  source: string;
  isDirecotry: boolean;
};

export const getDirectories = async ({
  source,
  isDirecotry,
}: GetDirectoriesArgs): Promise<string[]> => {
  const entries = await fs.readdir(source, { withFileTypes: true });
  const directories = entries
    .filter((entry) =>
      isDirecotry ? !!entry.isDirectory() : !entry.isDirectory()
    )
    .map((entry) => entry.name);
  return directories;
};
