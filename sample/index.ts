import {BrahVM} from "brah-weiroll-sdk";

const main = () => {
  const vm = new BrahVM();
  const vault = vm.contractByName("Vault");

  vm.planner.add(
    vault.functions.withdraw(
      1000,
      "0xE9F47d5EE5b73326e1EB9361630105e8Ca386874",
    ),
  );
  vm.assert(vault.functions.totalVaultFunds());

  vm.compile(true);
};

main();
