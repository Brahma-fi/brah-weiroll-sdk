# Brahma Weiroll SDK

An SDK to work with weiroll scripting to generate bytecode for automated workflows.
The repo is built by taking inspiration from experimental version of optimisim drippie mentioned [here](https://www.youtube.com/watch?v=Y7XvDL9-Co0) at [repo](https://github.com/ethereum-optimism/optimism/tree/sc/drippie-v2) by [KelvinFitcher](https://github.com/smartcontracts)

## Installation

` npm i --save-dev brah-weiroll-sdk`

(or)

` yarn add -D brah-weiroll-sdk`

## Setup

Setup primarily requires 2 config files that are defined to comply with their interfaces -

1. Main config

   - File name: `brah-weiroll.config.json`
   - Location: Directory root
   - Definition:

   ```ts
   interface ConfigFile {
     abiKey?: string; /// key pointing to contract abi, if the JSON file containing ABI has other data as well
     contracts: string; /// string path to contracts Config
     useForge: boolean; /// true or false to use forge file structure (abi will be read from ./out folder)
   }
   ```

   [sample](./sample/brah-weiroll.config.json)

2. Contracts Config

   - File name: Can be arbitrary, but matching the `contracts` key on `brah-weiroll.config.json`
   - Location: Can be arbitrary, but matching the `contracts` key on `brah-weiroll.config.json`
   - Definition:

   ```ts
   interface ContractsConfig {
     [key: string]: {
       /// name of contract
       address: string; /// contract address
       abi?: string; /// string path to file containing contract abi (not required if useForge: true)
     };
   }
   ```

   - **NOTE:** This must contain address and abi to a 'Helper.sol' contract

   [sample](./sample/config/contracts.json)

## Usage

1. Instantiate VM object using

   ```ts
   import {BrahVM} from "brah-weiroll-sdk";
   const vm = new BrahVM();
   ```

2. Import contracts and add functions to planner as required. Refer to [sample implementation](./sample/index.ts)

3. Compile VM using

   ```ts
   vm.compile(true);
   ```

   if the plan's bytecode is to be printed to STDOUT.

   otherwise,

   ```ts
   vm.compile();
   ```

## License

[MIT](./LICENSE.md)
