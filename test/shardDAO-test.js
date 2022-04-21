const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Register Participant", function () {
  beforeEach(async () => {
    contractFactory = await ethers.getContractFactory("ShardDAO");
    shardDao = await contractFactory.deploy("President");
    await shardDao.deployed();
    [owner, addr1, addr2, _] = await ethers.getSigners();
    participants = [
      "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
      "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    ];
    contestantNames = ["Dave", "Juliet"];
    contestantAddresses = [
      "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
      "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
      "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    ];
  });

  describe("Deployment", () => {
    it("Should deploy shardDAO contract", async function () {
      expect(await shardDao.deployed(), "shardDAO contract not deployed");
    });

    it("Should fail if name of position is not passed", async () => {
      contractFactory = await ethers.getContractFactory("ShardDAO");
      await expect(contractFactory.deploy()).to.be.reverted;
    });
  });

  describe("Registration", () => {
    it("Should successfully register participant since msg.sender is Chairman", async () => {
      await expect(
        shardDao.connect(owner).registerStudent(participants)
      ).to.emit(shardDao, "Register");
    });

    it("Should successfully register participant since msg.sender is Teacher", async () => {
      await shardDao.connect(owner).registerTeacher([addr1.address]);
      await expect(
        shardDao
          .connect(addr1)
          .registerStudent(["0x583031D1113aD414F02576BD6afaBfb302140225"])
      ).to.emit(shardDao, "Register");
    });

    it("Should be reverted since msg.sender is neither Chairman nor teacher", async () => {
      await expect(shardDao.connect(addr1).registerStudent(participants)).to.be
        .reverted;
    });

    it("Should return true since participant was registered as a student", async () => {
      await shardDao.connect(owner).registerStudent(participants);
      const role = await shardDao.isStudent(participants[0]);
      await expect(role).to.be.equal(true);
    });

    it("Should return true since participant was registered as a teacher", async () => {
      await shardDao.connect(owner).registerTeacher(participants);
      const role = await shardDao.isTeacher(participants[0]);
      await expect(role).to.be.equal(true);
    });

    it("Should return true since participant was registered as a board member", async () => {
      await shardDao.connect(owner).registerBoardMember(participants);
      const role = await shardDao.isBoard(participants[0]);
      await expect(role).to.be.equal(true);
    });

    it("Should be reverted since msg.sender is a student", async () => {
      await shardDao.connect(owner).registerStudent([addr2.address]);
      await expect(
        shardDao
          .connect(addr2)
          .registerStudent(["0x583031D1113aD414F02576BD6afaBfb302140225"])
      ).to.be.reverted;
    });
  });

  describe("Voting", () => {
    it("Should return 0 since no vote has been casted", async () => {
      expect(await shardDao.getTotalVoteCount()).to.equal(0);
    });
  });

  describe("Contestants", () => {
    it("Should return three empty arrays since no contestant has been added", async () => {
      console.log(await shardDao.getAllContestants());
      await expect(shardDao.getAllContestants()).to.be.not.reverted;
    });
  });
});
