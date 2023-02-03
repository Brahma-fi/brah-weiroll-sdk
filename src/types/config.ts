export interface ConfigFile {
  abiKey?: string; /// key pointing to contract abi, if the JSON file containing ABI has other data as well
  contracts: string; /// string path to contract Config
}

export interface ContractsConfig {
  [key: string]: {
    /// name of contract
    address: string; /// contract address
    abi: string; /// string path to file containing contract abi
  };
}
