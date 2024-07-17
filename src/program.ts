#!/usr/bin/env node
import { Command } from "commander";
import packageJson from "../package.json";
import { translate } from "./commands/translate";

const program = new Command();

program
  .name("@steadycursor/i18n-gpt-translate") //
  .version(packageJson.version);

program
  .command("run")
  .description("Split a string into substrings and display as an array")
  .option("--localesPath <path>", "display just the first substring")
  .option("--defaultLanguage <locale>", "separator character")
  .option("--token <token>", "separator character")
  .action((args: any) => {
    translate(args);
  });

program.parse();
