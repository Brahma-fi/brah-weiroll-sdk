export interface IMultipleContracts {
  name: string;
  type: ContractType;
}

export enum ContractType {
  DELEGATE,
  CALL,
  STATIC,
}

export enum CommandFlags {
  DELEGATECALL = 0,
  CALL = 1,
  STATICCALL = 2,
  CALL_WITH_VALUE = 3,
  CALLTYPE_MASK = 3,
  EXTENDED_COMMAND = 64,
  TUPLE_RETURN = 128,
}
