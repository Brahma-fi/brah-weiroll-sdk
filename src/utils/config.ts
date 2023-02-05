export default {
  configPath: "./brah-weiroll.config.json",
  configKeys: {
    contracts: "contracts",
    abiKey: "abiKey",
  },
  commons: {
    assert: "Assert",
    coersion: "Coersion",
    comparison: "Comparison",
    math: "Math",
    ethereum: "Ethereum",
  },
  forgeOut: (contractName: string) =>
    `./out/${contractName}.sol/${contractName}.json`,
};
