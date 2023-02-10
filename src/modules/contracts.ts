import * as weiroll from "@weiroll/weiroll.js";
import {CommandFlags} from "@weiroll/weiroll.js/dist/planner";
import {ethers} from "ethers";
import {ContractType, IMultipleContracts} from "../types";
import {getContractData} from "../utils";
import {validateSetup} from "../utils/validator";

export const getWeirollContract = (
  address: string,
  abi: any,
  type: ContractType = ContractType.CALL,
): weiroll.Contract => {
  const contract = new ethers.Contract(address, abi);

  if (type === ContractType.DELEGATE)
    return weiroll.Contract.createLibrary(contract);
  if (type === ContractType.STATIC)
    return weiroll.Contract.createContract(contract, CommandFlags.STATICCALL);

  return weiroll.Contract.createContract(contract);
};

export const getWeirollContractByName = (
  name: string,
  type: ContractType = ContractType.CALL,
): weiroll.Contract => {
  const {contractsConfig, abiKey, useForge} = validateSetup();

  const {address, abi} = getContractData(
    name,
    contractsConfig,
    useForge,
    abiKey,
  );

  return getWeirollContract(address, abi, type);
};

export const getMultipleWeirollContractsByName = (
  params: Array<IMultipleContracts>,
): weiroll.Contract[] => {
  return params.map(({name, type = ContractType.CALL}) =>
    getWeirollContractByName(name, type),
  );
};
