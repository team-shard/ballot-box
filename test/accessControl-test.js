const { ethers } = require("hardhat");
const { use, expect } = require("chai");

const { ContractFactory } = require("ethers");

let accounts;

describe("AccessControl", function () {

    beforeEach(async() => {
        accounts = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("AccessControl");
        AccessControl = await ethers.getContractFactory("AccessControl");
        accessControl = await AccessControl.deploy();
        await accessControl.deployed();
        Chairman = "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42";
        Board = "0x440f0b4326c1ea763c9f96608623635c8105d5cc0e4b4f20a4e4fe0546b15eeb";
        Teacher = "0x24428a7c8016b6f2b3148e1c17f4bed00ad0f5ab53b599683050e4e0aced359b";
        owner = accounts[0].address;
    });

    it("Should deploy AccessControl contract", async function() {
        expect(await accessControl.deployed(), "AccessControl contract not deployed");
    });

    it("Chairman should be able to grant role", async function() {
        let _role = Chairman;
        let _account = accounts[3].address;
        
        console.log("Granting...");
        await accessControl.grantRole(_role, _account);
       
        
    });

    it("Chairman should be able to grant Board role", async function(){
        let _role = Board;
        let _account = accounts[4].address;

        console.log("Granting...");
        await accessControl.grantRole(_role, _account);

    });

    it("Chairman should be able to grant teacher role", async function(){
        let _role = Teacher;
        let _account = accounts[5].address;
        console.log("Granting...");
        await accessControl.grantRole(_role,_account);
    });

    it("Chairman should be able to revoke ownership", async function() {
        let _role = Chairman;
        let _account = accounts[3].address;
       
        console.log("Revoking...");
        await accessControl.removeRole(_role, _account);
        // expect((await nestCoin.balanceOf(owner)).toNumber()).to.be.greaterThanOrEqual(amount, "Tokens were not successfully minted!");
        
    });

    it("Chairman should be able to revoke ownership", async function() {
        let _role = Board;
        let _account = accounts[4].address;
       
        console.log("Revoking...");
        await accessControl.removeRole(_role, _account);
        // expect((await nestCoin.balanceOf(owner)).toNumber()).to.be.greaterThanOrEqual(amount, "Tokens were not successfully minted!");
        
    });

    it("check if address is a chairman", async function(){
        let _account = accounts[3].address;
        console.log("Checking...");
        await accessControl.isChairman(_account);

    });
    it("check if address is a a board of director", async function(){
        let _account = accounts[3].address;
        console.log("Checking...");
        await accessControl.isBoard(_account);
        
    });
    it("check if address is a a Teacher ", async function(){
        let _account = accounts[3].address;
        console.log("Checking...");
        await accessControl.isTeacher(_account);
        
    });
    it("check if address is a a student", async function(){
        let _account = accounts[3].address;
        console.log("Checking...");
        await accessControl.isStudent(_account);
        
    });
    it("Getting if an address has a role and returning it", async function(){
        let _account = accounts[3].address;
        console.log("Checking...");
        await accessControl.getUserRole(_account);
        
    });

});