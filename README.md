# ShardDAO
###Deployed Dapp: https://shard.surge.sh/
####Deployed Contract: https://rinkeby.etherscan.io/address/0xd6c1AdD1B7C7Af82B0d919C39C48A7f008D3B4d7
####This project demonstrates a Ballot Voting system that is implemented with 4 stackholder positions in mind:

1. Chairman (has the highest access priviledge)
2. Teacher
3. Board Member
4. Student

Each role has a part to play in the system. <br>

| Stackholder   |     role |
|----------|-------------|
| Chairman |Start/End elections, register participants and contestants, pause/unpause elections, reset election duration, vote|
| Teacher |   register participants and contestants, start/stop elections, vote   | 
| Board member|  view election results, vote|
| Student | vote


## Project Setup

- Install Hardhat, go to an empty folder, initialize an npm project (ie. `npm init`) and run <br>

```
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers

```

- Once it's installed, create a .env file with the following variables:

  **CONTRACT_NAMES** = names of the contract that should be copied to the react app directory seperated by commas.

  **NODE_PROVIDER_URL** = API link from node provider infura/alchemy etc.

  **PRIVATE_KEY** = your wallet private key for deploying to rinkeby testnet.

- If all goes as plan, try running the following commands:

  `npx `
  ```shell
  npx hardhat accounts
  npx hardhat compile
  npx hardhat clean
  npx hardhat test
  npx hardhat node
  node scripts/deploy.js
  npx hardhat help
  ```
  ## Notes
  1. The contract is `paused` by default (when deployed) so voting cannot happen.
  2. Before you can `startElection` you must register at least one contestant.
  3. Any contestant that wishes to run for a post must be first registered as one of the above stated stakeholders.
  4. The `pause` and `unpause` functions are only for emergency and are only accessible to the chairman.
  5. You can only get election winner after thee election is over.
