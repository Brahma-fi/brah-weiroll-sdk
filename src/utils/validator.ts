import {readFileSync} from "fs";
import {ConfigFile, ContractsConfig} from "../types/config";
import Config from "./config";

export const validateSetup = () => {
  const contractsConfig = validateConfigFile();
  validateContractsConfig(contractsConfig);
};

const validateConfigFile = (): ContractsConfig => {
  const config: ConfigFile = JSON.parse(
    readFileSync(Config.configPath, "utf-8"),
  );

  if (config.abiKey)
    if (typeof config.abiKey !== "string")
      throw new Error("[Incorrect config] abi key must be a string");

  if (!config.contracts)
    throw new Error("[Incorrect config] contracts path not found");
  else if (typeof config.contracts !== "string")
    throw new Error("[Incorrect config] contracts path must be a string");

  return JSON.parse(readFileSync(config.contracts, "utf-8"));
};

const validateContractsConfig = (contractsConfig: ContractsConfig) => {
  Object.keys(contractsConfig).forEach((it) => {
    if (typeof it !== "string")
      throw new Error(
        "[Incorrect config] All contract config keys must be strings",
      );

    const innerKeys = Object.keys(contractsConfig[it]);

    if (
      innerKeys.length !== 2 ||
      !innerKeys.includes("address") ||
      !innerKeys.includes("abi")
    )
      throw new Error("[Incorrect config] contract data not defined correctly");

    if (
      typeof contractsConfig[it].abi !== "string" ||
      typeof contractsConfig[it].address !== "string"
    )
      throw new Error("[Incorrect config] contract abi || address incorrect");
  });
};
