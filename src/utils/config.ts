export default {
  configPath: "./brah-weiroll.config.json",
  configKeys: {
    contracts: "contracts",
    abiKey: "abiKey",
  },
  commons: {
    helper: "Helper",
  },
  forgeOut: (contractName: string) =>
    `./out/${contractName}.sol/${contractName}.json`,
};
