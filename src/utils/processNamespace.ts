import * as path from "path";
import { prepareLocaleJson } from "./prepareLocaleJson";
import { processLocaleNamespace } from "./processLocaleNamespace";
import Spinnies from "spinnies";

export const processNamespace = async (args: { namespace: string; defaultLng: string; path: string; locales: string[]; token: string; spinnies: Spinnies }) => {
  const namespaceFilePath = path.join(args.path, args.defaultLng, args.namespace + ".json");

  const defaultLocaleJson = await prepareLocaleJson({
    path: namespaceFilePath,
  });

  const keys = defaultLocaleJson.keys.filter(
    // Only keys that have value for default lng
    (key) => !!defaultLocaleJson.data[key]
  );

  for (const locale of args.locales.filter((locale) => locale !== args.defaultLng)) {
    args.spinnies.add(args.namespace + locale, { text: locale, status: "non-spinnable", indent: 3 });
  }

  for (const locale of args.locales.filter((locale) => locale !== args.defaultLng)) {
    args.spinnies.update(args.namespace + locale, { status: "spinning" });

    await processLocaleNamespace({
      locale,
      namespace: args.namespace,
      defaultLanguage: args.defaultLng,
      path: args.path,
      keys,
      data: defaultLocaleJson.data,
      token: args.token,
    }).then(() => args.spinnies.succeed(args.namespace + locale));
  }
};
