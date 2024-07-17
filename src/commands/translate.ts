import * as path from "path";
import { getRealPath } from "../utils/getRealPath";
import { checkPath } from "../utils/checkPath";
import _ from "lodash";
import { getDirectories } from "../utils/getDirectories";
import { processNamespace } from "../utils/processNamespace";
import Spinnies from "spinnies";

type TranslateArgs = {
  localesPath: string;
  defaultLanguage: string;
  token: string;
};

export const translate = async ({ localesPath, defaultLanguage, token }: TranslateArgs) => {
  const spinnies = new Spinnies();

  if (!localesPath) {
    console.log("Missing locales path.");

    return;
  }

  if (!defaultLanguage) {
    console.log("Missing default language.");

    return;
  }

  if (!token) {
    console.log("Missing token.");

    return;
  }

  const pathExists = await checkPath({ source: localesPath });

  if (!pathExists) {
    console.log("Provided path does not exists.");

    return;
  }

  const locales = await getDirectories({ source: localesPath, isDirecotry: true });

  console.log("Available locales", locales.join(", "), "\n");
  console.log("Real path", await getRealPath({ source: localesPath }), "\n");

  if (!locales.includes(defaultLanguage)) {
    console.log(`Path does not include folder with default language ${defaultLanguage}.`);

    return;
  }

  const namespaceFiles = await getDirectories({ source: path.join(localesPath, defaultLanguage), isDirecotry: false });

  const namespaces = namespaceFiles.filter((namespace) => !!namespace.includes(".json")).map((namespace) => namespace.replace(".json", ""));

  console.log("Processing namespaces:\n");

  for (const namespace of namespaces) {
    spinnies.add(namespace, { text: `Namespace: ${namespace}` });

    await processNamespace({
      path: localesPath,
      defaultLng: defaultLanguage,
      namespace,
      locales,
      token,
      spinnies,
    }).then(() => spinnies.succeed(namespace));

    spinnies.add("\n", { status: "non-spinnable" });
  }

  spinnies.stopAll();

  console.log("Translation script finished.\n");
};
