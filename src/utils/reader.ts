import {readFileSync} from "fs";
import {ConfigFile, ContractsConfig} from "../types/config";

import Config from "./config";

export const getConfigFile = () =>
  JSON.parse(readFileSync(Config.configPath, "utf-8"));

export const getContractData = (
  name: string,
  contractsConfig: ContractsConfig,
  abiKey?: string,
) => {
  if (!contractsConfig[name])
    throw new Error(`no matching definition found for contract: ${name}`);

  const contract = contractsConfig[name];

  return {
    address: contract.address,
    abi: !abiKey
      ? JSON.parse(readFileSync(contract.abi, "utf-8"))
      : JSON.parse(readFileSync(contract.abi, "utf-8"))[abiKey!],
  };
};
