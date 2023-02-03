import * as weiroll from "@weiroll/weiroll.js";
import {ethers} from "ethers";
import {IMultipleContracts} from "../types";
import {Config} from "../utils";
import {
  getMultipleWeirollContractsByName,
  getWeirollContract,
  getWeirollContractByName,
} from "./contracts";

export type PlannerAdd = ReturnType<weiroll.Planner["add"]>;

export class BrahVM {
  planner: weiroll.Planner;

  constructor() {
    this.planner = new weiroll.Planner();
  }

  compile(): {
    commands: string[];
    state: string[];
  } {
    return this.planner.plan();
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

  contractByAddress(address: any, abi: any): weiroll.Contract {
    return getWeirollContract(address, abi);
  }

  contractByName(name: string, isDelegateCalled: boolean): weiroll.Contract {
    return getWeirollContractByName(name, isDelegateCalled);
  }

  multipleContractsByName(
    params: Array<IMultipleContracts>,
  ): weiroll.Contract[] {
    return getMultipleWeirollContractsByName(params);
  }
}
