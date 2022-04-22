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

  const contractAddress = "0x6A08244EF41483B197847630709919BE209135A5";
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
