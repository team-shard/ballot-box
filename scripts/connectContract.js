//Script to connect to deployed contract and send in transactions
const { ethers } = require("hardhat");
const main = async () => {
  const [connector] = await ethers.getSigners();
  const accountBalance = await connector.getBalance();

  console.log(
    connector.address,
    " is connecting to ShardDAO Contract..."
  );
  console.log(
    connector.address,
    " Account balance: ",
    accountBalance.toString()
  );

  const contractAddress = "0x0dD19D155ba6bc04106801B05d21FFfCa32521Ea";
  const myContract = await ethers.getContractAt("ShardDAO",contractAddress);

  let myBalance = await myContract.getAllContestants();
  console.log(myBalance);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runMain();
