import {readFileSync} from "fs";
import {ConfigFile, ContractsConfig} from "../types/config";
import Config from "./config";

type ValidateReturn = {
  contractsConfig: ContractsConfig;
  abiKey?: string;
  useForge: boolean;
};

export const validateSetup = (): ValidateReturn => {
  const {contractsConfig, abiKey, useForge} = validateConfigFile();
  validateContractsConfig(contractsConfig, useForge);

  return {contractsConfig, abiKey, useForge};
};

const validateConfigFile = (): ValidateReturn => {
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

  let useForge = false;
  if (config.useForge) {
    if (typeof config.useForge !== "boolean")
      throw new Error("[Incorrect config] useForge must be a boolean");

    useForge = config.useForge;
  }

  return {
    contractsConfig: JSON.parse(readFileSync(config.contracts, "utf-8")),
    abiKey: config.abiKey,
    useForge,
  };
};

const validateContractsConfig = (
  contractsConfig: ContractsConfig,
  useForge: boolean = false,
) => {
  const configKeys = Object.keys(contractsConfig);

  Object.values(Config.commons).forEach((commonContract) => {
    if (!configKeys.includes(commonContract))
      throw new Error(
        `[Incorrect config] Common helper: ${commonContract} not found`,
      );
  });

  configKeys.forEach((it) => {
    if (typeof it !== "string")
      throw new Error(
        "[Incorrect config] All contract config keys must be strings",
      );

    const innerKeys = Object.keys(contractsConfig[it]);
    const keysLength = useForge ? 1 : 2;

    if (
      innerKeys.length !== keysLength ||
      !innerKeys.includes("address") ||
      (!innerKeys.includes("abi") && !useForge)
    )
      throw new Error("[Incorrect config] contract data not defined correctly");

    if (
      (typeof contractsConfig[it].abi !== "string" && !useForge) ||
      typeof contractsConfig[it].address !== "string"
    )
      throw new Error("[Incorrect config] contract abi || address incorrect");
  });
};
