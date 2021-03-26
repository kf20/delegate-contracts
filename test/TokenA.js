const TokenA = artifacts.require("./TokenA.sol");

contract("TokenA", (accounts) => {
    let tokenInstance;
    
    beforeEach(async () => {
        tokenInstance = await TokenA.new();
    })
    it("should mint / get balance", async () => {
        const amount = 100;
        //mint
        const result1 = await tokenInstance.mint(accounts[0], amount, { from: accounts[0] });
        assert.equal(result1.receipt.status, true);
        //check balance
        const result2 = await tokenInstance.balanceOf(accounts[0]);
        assert.equal(result2, amount);
    })
    it("should transfer", async () => {
        const amount = 100;
        //mint
        const result1 = await tokenInstance.mint(accounts[0], amount, { from: accounts[0] });
        assert.equal(result1.receipt.status, true);
        //transfer
        const result2 = await tokenInstance.transfer(accounts[1], amount, { from: accounts[0] });
        assert.equal(result2.receipt.status, true);
        //check balances
        const result3 = await tokenInstance.balanceOf(accounts[1]);
        assert.equal(result3, amount);
        const result4 = await tokenInstance.balanceOf(accounts[0]);
        assert.equal(result4, 0);
    })
    it("should transferFrom", async () => {
        const amount = 100;
        //mint
        const result1 = await tokenInstance.mint(accounts[0], amount, { from: accounts[0] });
        assert.equal(result1.receipt.status, true);
        //approve
        const result2 = await tokenInstance.approve(accounts[2], amount, { from: accounts[0] });
        assert.equal(result2.receipt.status, true);
        //transferFrom
        const result3 = await tokenInstance.transferFrom(accounts[0], accounts[1], amount, { from: accounts[2] });
        assert.equal(result3.receipt.status, true);
        //check balances
        const result4 = await tokenInstance.balanceOf(accounts[1]);
        assert.equal(result4, amount);
        const result5 = await tokenInstance.balanceOf(accounts[0]);
        assert.equal(result5, 0);
    })
})