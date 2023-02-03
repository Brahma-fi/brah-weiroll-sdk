import {readFileSync} from "fs";

import Config from "./config";

export const getConfigFile = () =>
  JSON.parse(readFileSync(Config.configPath, "utf-8"));

export const getContractData = (name: string) => {
  const configFile = getConfigFile();
  const contractsData = JSON.parse(
    readFileSync(configFile[Config.configKeys.contracts], "utf-8"),
  );

  if (!contractsData[name])
    throw new Error(`no matching definition found for contract: ${name}`);

  const contract = contractsData[name];
  const abiKey = configFile[Config.configKeys.abiKey];

  return {
    address: contract.address,
    abi: !!abiKey
      ? JSON.parse(readFileSync(contract.abiPath, "utf-8"))
      : JSON.parse(readFileSync(contract.abiPath, "utf-8"))[abiKey],
  };
};
