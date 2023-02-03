import * as weiroll from "@weiroll/weiroll.js";
import {ethers} from "ethers";
import {IMultipleContracts} from "../types";
import {getContractData} from "../utils";
import {validateSetup} from "../utils/validator";

export const getWeirollContract = (
  address: string,
  abi: any,
  isDelegateCalled: boolean = false,
): weiroll.Contract => {
  const contract = new ethers.Contract(address, abi);

  if (isDelegateCalled) return weiroll.Contract.createLibrary(contract);

  return weiroll.Contract.createContract(contract);
};

export const getWeirollContractByName = (
  name: string,
  isDelegateCalled: boolean = false,
): weiroll.Contract => {
  const {contractsConfig, abiKey} = validateSetup();

  const {address, abi} = getContractData(name, contractsConfig, abiKey);

  return getWeirollContract(address, abi, isDelegateCalled);
};

export const getMultipleWeirollContractsByName = (
  params: Array<IMultipleContracts>,
): weiroll.Contract[] => {
  return params.map(({name, isDelegateCalled}) =>
    getWeirollContractByName(name, isDelegateCalled),
  );
};
