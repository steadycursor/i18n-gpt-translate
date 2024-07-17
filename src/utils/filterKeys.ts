type FilterKeysArgs = {
  obj: any;
  keysToKeep: string[];
};

export const filterKeys = ({ obj, keysToKeep }: FilterKeysArgs): any => {
  const filteredObject: any = {};

  for (const key of keysToKeep) {
    if (key in obj) {
      filteredObject[key] = obj[key];
    }
  }

  return filteredObject;
};
