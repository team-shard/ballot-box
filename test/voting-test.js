const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Testing ShardDAO Voting Features", function () {
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];

    let shardDaoFactory = await ethers.getContractFactory("ShardDAO");
    shardDAOContract = await shardDaoFactory.deploy("president");
    await shardDAOContract.deployed();
  });

  it("Should deploy contract and set chairman", async function () {
    let daoChairman = await shardDAOContract.chairman();
    expect(daoChairman, "Contract not deployed").equals(deployer.address);
  });

 it("Should not vote when election is paused", async function () {
  const tryToVote = async () => {
    let voteTx = await shardDAOContract
    .vote(1);
  await voteTx.wait();
  } 
  
  await expect(tryToVote()).to.be.revertedWith(
    "Pausable: paused"
  );
 });

 it("Should allow authourized to start election", async function () {
  const authCanStartElection = async () => {
    let tx = await shardDAOContract.startElection(100);
    await tx.wait();
  }

  await expect(authCanStartElection()).to.be.revertedWith(
    "Please register at least one contestant"
  );

  let tx = await shardDAOContract.registerBoardMember([accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract.addContestant(["BUJ"],[accounts[2].address]);
  await tx.wait();
  let teacher = accounts[3];
  tx = await shardDAOContract.registerTeacher([teacher.address]);
  tx = await shardDAOContract
          .connect(teacher)
          .startElection(100);
  await tx.wait();


  expect(await shardDAOContract.timeToVote(),"Time not properly set").equal(100)
});

it("Can vote after election starts", async function () {
  
  let tx = await shardDAOContract.registerBoardMember([accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract.addContestant(["BUJ"],[accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract
          .startElection(100);
  await tx.wait();

  await expect(shardDAOContract.vote(0))
    .to.emit(shardDAOContract, 'Voted')
});

it("Should not be able to vote twice", async function () {
  
  let tx = await shardDAOContract.registerBoardMember([accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract.addContestant(["BUJ"],[accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract
          .startElection(100);
  await tx.wait();

  await expect(shardDAOContract.vote(0))
    .to.emit(shardDAOContract, 'Voted')
  
  await expect(shardDAOContract.vote(0))
    .to.be.revertedWith("Already voted.")
});

it("Should not vote when election has ended", async function () {
  
  let tx = await shardDAOContract.registerBoardMember([accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract.addContestant(["BUJ"],[accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract
          .startElection(5);
  await tx.wait();

  await new Promise(r => setTimeout(r, 5 * 1000));
  await expect(shardDAOContract.vote(0))
    .to.be.revertedWith("TooLate()")
});

it("Students cannot call function to get election winners", async function () {
  
  let student = accounts[2];
  let tx = await shardDAOContract.registerStudent([student.address]);
  await tx.wait();
  
  const tryGetWinner = async () => {
    let tx = await shardDAOContract
                .connect(student)
                .winnerNameAndAddress();
    await tx.wait();
  }
  
  await expect(tryGetWinner())
    .to.be.revertedWith("Must be Teacher or Chairman")
});

it("Cannot get election winner if election has not ended", async function () {
  
  let tx = await shardDAOContract.registerBoardMember([accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract.addContestant(["BUJ"],[accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract.registerBoardMember([accounts[3].address]);
  await tx.wait();
  tx = await shardDAOContract.addContestant(["OBJ"],[accounts[3].address]);
  await tx.wait();

  tx = await shardDAOContract.startElection(100);
  await tx.wait();

  tx = await shardDAOContract.vote(0);
  await tx.wait();
  
  await expect(shardDAOContract.winnerNameAndAddress())
            .to.be.revertedWith("Wait for election to end")
});

it("Should get the election winner", async function () {
  
  let tx = await shardDAOContract.registerBoardMember([accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract.addContestant(["BUJ"],[accounts[2].address]);
  await tx.wait();
  tx = await shardDAOContract.registerBoardMember([accounts[3].address]);
  await tx.wait();
  tx = await shardDAOContract.addContestant(["OBJ"],[accounts[3].address]);
  await tx.wait();

  tx = await shardDAOContract.startElection(3);
  await tx.wait();

  tx = await shardDAOContract.vote(0);
  await tx.wait();

  await new Promise(r => setTimeout(r, 3 * 1000));

  await expect(shardDAOContract
    .winnerNameAndAddress())
    .to.emit(shardDAOContract, "Winner").withArgs("BUJ", accounts[2].address)
  
});

it("Should allow authorized to set new time", async function () {
  
    let tx = await shardDAOContract.registerStudent([accounts[2].address]);
    await tx.wait();
   
    tx = await shardDAOContract.registerBoardMember([accounts[3].address]);
    await tx.wait();
    tx = await shardDAOContract.addContestant(["OBJ"],[accounts[3].address]);
    await tx.wait();
  
  
    await expect(shardDAOContract
        .connect(accounts[2])
        .setVoteTime(3)).to.be.revertedWith("Must be Teacher or Chairman")

    tx = await shardDAOContract.startElection(3);
    await tx.wait();
    await new Promise(r => setTimeout(r, 3 * 1000));
    
    tx = await shardDAOContract.setVoteTime(5);
    await tx.wait();

    await expect(await shardDAOContract
      .timeToVote())
      .equals(5)
  });

  it("Authorized should be able to end Election", async function () {

    tx = await shardDAOContract.registerBoardMember([accounts[3].address]);
    await tx.wait();
    tx = await shardDAOContract.addContestant(["OBJ"],[accounts[3].address]);
    await tx.wait();

    tx = await shardDAOContract.startElection(3);
    await tx.wait();
    await new Promise(r => setTimeout(r, 3 * 1000));

    tx = await shardDAOContract.endElection();
    await tx.wait();
    
    expect(await shardDAOContract
        .timeToVote())
        .equals(0)
  });
  

});
