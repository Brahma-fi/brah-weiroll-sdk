import * as weiroll from "@weiroll/weiroll.js";
import {ethers} from "ethers";
import {getContractData} from "../utils";

export const getWeirollContractByName = (
  name: string,
  isDelegateCalled: boolean = false,
) => {
  const {address, abi} = getContractData(name);
  const contract = new ethers.Contract(address, abi);

  if (isDelegateCalled) return weiroll.Contract.createLibrary(contract);

  return weiroll.Contract.createContract(contract);
};

export const getMultipleWeirollContractsByName = (
  params: Array<{
    name: string;
    isDelegateCalled: boolean;
  }>,
) => {
  return params.map(({name, isDelegateCalled}) =>
    getWeirollContractByName(name, isDelegateCalled),
  );
};
