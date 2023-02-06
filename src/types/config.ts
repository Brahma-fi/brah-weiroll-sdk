export interface ConfigFile {
  abiKey?: string; /// key pointing to contract abi, if the JSON file containing ABI has other data as well
  contracts: string; /// string path to contracts Config
  useForge: boolean; /// true or false to use forge file structure
}

export interface ContractsConfig {
  [key: string]: {
    /// name of contract
    address: string; /// contract address
    abi?: string; /// string path to file containing contract abi (not required if useForge: true)
  };
}
