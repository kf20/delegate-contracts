const TokenA = artifacts.require("./TokenA.sol")
const ContractLogic = artifacts.require("./ContractLogic.sol");
const ContractProxy = artifacts.require("./ContractProxy.sol");

contract("ContractProxy", (accounts) => {
    let tokenInstance;
    let logicInstance
    let proxyInstance;
    
    beforeEach(async () => {
        tokenInstance = await TokenA.new();
        logicInstance = await ContractLogic.new();
        proxyInstance = await ContractProxy.new();
        //set logic
        await proxyInstance.setLogic(logicInstance.address);
    })
    it("should set / get logic contract", async () => {
        //get logic
        const result1 = await proxyInstance.getLogic();
        assert.equal(result1, logicInstance.address);
    })
    it("should recieve tokens", async () => {
        const amount = 100;
        //mint
        const result1 = await tokenInstance.mint(proxyInstance.address, amount, { from: accounts[0] });
        assert.equal(result1.receipt.status, true);
        //check balance
        const result2 = await tokenInstance.balanceOf(proxyInstance.address);
        assert.equal(result2, amount);
    })
    it("should transfer", async () => {
        const amount = 100;
        //mint
        const result1 = await tokenInstance.mint(proxyInstance.address, amount, { from: accounts[0] });
        assert.equal(result1.receipt.status, true);
        //transfer
        const result2 = await proxyInstance.transfer(tokenInstance.address, accounts[1], amount/2);
        assert.equal(result2.receipt.status, true);
        //check balances
        const result3 = await tokenInstance.balanceOf(proxyInstance.address);
        assert.equal(result3.toNumber(), amount/2);
        const result4 = await tokenInstance.balanceOf(accounts[1]);
        assert.equal(result4.toNumber(), amount/2);
    })
    it("should transferFrom", async () => {
        const amount = 100;
        //mint
        const result1 = await tokenInstance.mint(accounts[0], amount, { from: accounts[0] });
        assert.equal(result1.receipt.status, true);
        //approve
        const result2 = await tokenInstance.approve(proxyInstance.address, amount/2, { from: accounts[0] });
        assert.equal(result2.receipt.status, true);
        //transferFrom
        const result3 = await proxyInstance.transferFrom(tokenInstance.address, accounts[0], accounts[1], amount/2);
        assert.equal(result3.receipt.status, true);
        //check balances
        const result4 = await tokenInstance.balanceOf(accounts[0]);
        assert.equal(result4.toNumber(), amount/2);
        const result5 = await tokenInstance.balanceOf(accounts[1]);
        assert.equal(result5.toNumber(), amount/2);
    })
})