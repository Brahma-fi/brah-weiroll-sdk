export interface IMultipleContracts {
  name: string;
  type: ContractType;
}

export enum ContractType {
  DELEGATE,
  CALL,
  STATIC,
}
