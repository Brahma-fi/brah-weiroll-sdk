import * as weiroll from "@weiroll/weiroll.js";
import {ethers} from "ethers";
import {ContractType, IMultipleContracts} from "../types";
import {Config} from "../utils";
import {validateSetup} from "../utils/validator";
import {
  getMultipleWeirollContractsByName,
  getWeirollContract,
  getWeirollContractByName,
} from "./contracts";

export type PlannerAdd = ReturnType<weiroll.Planner["add"]>;

export class BrahVM {
  planner: weiroll.Planner;

  constructor() {
    validateSetup();
    this.planner = new weiroll.Planner();
  }

  compile(printPlan: boolean): {
    commands: string[];
    state: string[];
  } {
    const {commands, state} = this.planner.plan();

    if (printPlan) {
      const encodedRes = ethers.utils.AbiCoder.prototype.encode(
        ["bytes32[]", "bytes[]"],
        [commands, state],
      );

      console.log(encodedRes);
    }

    return {commands, state};
  }

  assert(value: any): PlannerAdd {
    return this.planner.add(
      getWeirollContractByName(Config.commons.assert).t(value),
    );
  }

  and(a: any, b: any): PlannerAdd {
    return this.planner.add(
      getWeirollContractByName(Config.commons.comparison).and(a, b),
    );
  }

  lt(a: any, b: any): PlannerAdd {
    return this.planner.add(
      getWeirollContractByName(Config.commons.comparison).lt(a, b),
    );
  }

  gt(a: any, b: any): PlannerAdd {
    return this.planner.add(
      getWeirollContractByName(Config.commons.comparison).gt(a, b),
    );
  }

  add(a: any, b: any): PlannerAdd {
    return this.planner.add(
      getWeirollContractByName(Config.commons.math).add(a, b),
    );
  }

  balance(address: any): PlannerAdd {
    return this.planner.add(
      getWeirollContractByName(Config.commons.ethereum).balance(address),
    );
  }

  timestamp(): PlannerAdd {
    return this.planner.add(
      getWeirollContractByName(Config.commons.ethereum).timestamp(),
    );
  }

  transfer(address: any, amount: any): PlannerAdd {
    return this.planner.add(
      getWeirollContractByName(Config.commons.ethereum)[
        "transfer(address,uint256)"
      ](address, amount),
    );
  }

  contractByAddress(address: any, abi: any): weiroll.Contract {
    return getWeirollContract(address, abi);
  }

  contractByName(name: string): weiroll.Contract {
    return getWeirollContractByName(name);
  }

  libraryByAddress(address: any, abi: any): weiroll.Contract {
    return getWeirollContract(address, abi, ContractType.DELEGATE);
  }

  libraryByName(name: string): weiroll.Contract {
    return getWeirollContractByName(name, ContractType.DELEGATE);
  }

  staticContractByAddress(address: any, abi: any): weiroll.Contract {
    return getWeirollContract(address, abi, ContractType.STATIC);
  }

  staticContractByName(name: string): weiroll.Contract {
    return getWeirollContractByName(name, ContractType.STATIC);
  }

  multipleContractsByName(
    params: Array<IMultipleContracts>,
  ): weiroll.Contract[] {
    return getMultipleWeirollContractsByName(params);
  }
}
