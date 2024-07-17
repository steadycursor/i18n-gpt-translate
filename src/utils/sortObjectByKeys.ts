type SortObjectByKeysArgs = {
  obj: Record<string, any>;
  keyOrder: string[];
};

export const sortObjectByKeys = ({
  keyOrder,
  obj,
}: SortObjectByKeysArgs): Record<string, any> => {
  const sortedObj: Record<string, any> = {};

  keyOrder.forEach((key) => {
    if (obj.hasOwnProperty(key)) {
      sortedObj[key] = obj[key];
    }
  });

  return sortedObj;
};
