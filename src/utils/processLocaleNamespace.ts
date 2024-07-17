import { translateJson } from "./translateJson";
import { filterKeys } from "./filterKeys";
import * as path from "path";
import { prepareLocaleJson } from "./prepareLocaleJson";
import { checkPath } from "./checkPath";
import { sortObjectByKeys } from "./sortObjectByKeys";
import fs from "fs/promises";
import * as _ from "lodash";

export const processLocaleNamespace = async (args: {
  locale: string;
  namespace: string;
  defaultLanguage: string;
  path: string;
  keys: string[];
  data: { [key: string]: string | undefined };
  token: string;
}) => {
  const jsonPath = path.join(args.path, args.locale, args.namespace + ".json");

  const pathExists = await checkPath({ source: jsonPath });

  if (!pathExists) {
    fs.writeFile(jsonPath, "");
  }

  const json = await prepareLocaleJson({ path: jsonPath });

  const keysToBeProcessed = args.keys.filter((key) => {
    return !json.data.hasOwnProperty(key) || json.data[key] === "";
  });

  const keysToBeProcessedChunks = _.chunk(keysToBeProcessed, 50);

  const translations = [];

  for (const keysToBeProcessedChunk of keysToBeProcessedChunks) {
    const dataForTranslation = filterKeys({
      obj: args.data,
      keysToKeep: keysToBeProcessedChunk,
    });

    const translation = await translateJson(dataForTranslation, args.locale, args.token);

    translations.push(translation);
  }

  const updatedSourceData = _.merge(json.data, _.merge({}, ...translations));

  const sortedObject = sortObjectByKeys({
    obj: updatedSourceData,
    keyOrder: args.keys,
  });

  const { unflatten } = await import("flat");

  const preparedJson = unflatten(sortedObject);

  await fs.writeFile(jsonPath, JSON.stringify(preparedJson, null, 2), "utf-8");
};
