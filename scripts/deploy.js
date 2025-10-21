const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with address:", deployer.address);

  const NAME = process.env.TOKEN_NAME || "Governed Token";
  const SYMBOL = process.env.TOKEN_SYMBOL || "GVT";
  const CAP = process.env.TOKEN_CAP_ETH ? hre.ethers.parseUnits(process.env.TOKEN_CAP_ETH, 18) : hre.ethers.parseUnits("1000000", 18); // default 1_000_000 tokens
  const ADMIN = process.env.BENEFICIARY || deployer.address;
  const MINTER = process.env.MINTER || deployer.address;

  const Governed = await hre.ethers.getContractFactory("GovernedERC20");
  const governed = await Governed.deploy(NAME, SYMBOL, CAP, ADMIN, MINTER);
  await governed.waitForDeployment();
  console.log("GovernedERC20 deployed to:", await governed.getAddress());
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
