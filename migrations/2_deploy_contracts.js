const TokenA = artifacts.require("./TokenA.sol");
const ContractLogic = artifacts.require("./ContractLogic.sol");
const ContractProxy = artifacts.require("./ContractProxy.sol");

module.exports = function(deployer, _network, _accounts) {
    deployer.deploy(TokenA);
    deployer.deploy(ContractLogic);
    deployer.deploy(ContractProxy);
}
