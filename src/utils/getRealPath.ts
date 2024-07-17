import fs from "fs/promises";

type GetRealPathArgs = {
  source: string;
};

export const getRealPath = ({ source }: GetRealPathArgs) => {
  return fs.realpath(source);
};
