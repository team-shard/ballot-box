const asyncfs = require("fs/promises");
const dotenv = require("dotenv");
dotenv.config();

async function updateClientContract() {
  try {
    let contractName = process.env.CONTRACT_NAMES;
    if (!contractName) {
      console.error(
        "\x1b[41m",
        "CONTRACT_NAMES not found in enviroment variables."
      );
      console.error(
        "Consider adding 'CONTRACT_NAMES = contractName1,contractName2,contractName3 ...' to .env file"
      );
      console.log("\x1b[0m");
      return;
    }
    await deleteExistingContractABI();
    contractName.split(",").forEach(async (element) => {
      console.log(`copying ${element}.sol to frontend/src/contracts 👍`);
      await asyncfs.copyFile(
        `artifacts/contracts/${element}.sol/${element}.json`,
        `frontend/src/contracts/${element}.json`
      );
    });
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

async function deleteExistingContractABI() {
  const directory = "frontend/src/contracts";
  try {
    await asyncfs.rm(directory, {
      recursive: true,
    });
  } catch {
    console.log("No preExisting complied contracts ⛳");
  }
  try {
    await asyncfs.access("frontend");
  } catch {
    await asyncfs.mkdir("frontend");
  }
  try {
    await asyncfs.access("frontend/src");
  } catch {
    await asyncfs.mkdir("frontend/src");
  }

  await asyncfs.mkdir(directory);
}

updateClientContract();
